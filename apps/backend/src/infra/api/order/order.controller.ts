import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { OrdersService } from '@/application/services/order.service';
import { CreateOrderDTO } from '@/domain/dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  @ApiOkResponse({ type: CreateOrderDTO })
  @ApiBadRequestResponse({ description: 'Invalid data sent' })
  async createOrder(@Body() order: CreateOrderDTO) {
    if (!order) {
      throw new BadRequestException('Invalid data sent');
    }

    const initialOrder = await this.ordersService.createInitialOrder();

    const queryAcceptanceToken = await fetch(
      `${process.env.PAYMENT_API_URL}/merchants/${process.env.PUBLIC_MERCHANT_ID}`,
    );

    if (!queryAcceptanceToken.ok) {
      throw new BadRequestException('Could not get acceptance token');
    }

    const acceptance_token = (await queryAcceptanceToken.json()).data
      .presigned_acceptance.acceptance_token;

    const cardTokenRequest = await fetch(
      `${process.env.PAYMENT_API_URL}/tokens/cards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PUBLIC_MERCHANT_ID}`,
        },
        body: JSON.stringify({
          number: order.cardInfo,
          cvc: order.cvv,
          exp_month: order.expiryDate?.slice(0, 2),
          exp_year: order.expiryDate?.slice(3, 5),
          card_holder: order.nameOnCard,
        }),
      },
    );

    if (!cardTokenRequest.ok) {
      throw new BadRequestException('Could not get card token');
    }

    const cardToken = await cardTokenRequest.json();

    const str = `${initialOrder.id}${order.orderTotal! * 100}COP${process.env.PRIVATE_INTEGRITY_KEY}`;

    const encondedText = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const transactionRequest = await fetch(
      `${process.env.PAYMENT_API_URL}/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PRIVATE_MERCHANT_ID}`,
        },
        body: JSON.stringify({
          acceptance_token,
          reference: initialOrder.id,
          amount_in_cents: order.orderTotal! * 100,
          currency: 'COP',
          signature,
          customer_email: 'money@yopmail.com',
          payment_method: {
            type: 'CARD',
            token: cardToken.data.id,
            installments: 1,
          },
          customer_data: {
            phone_number: '573307654321',
            full_name: order.nameOnCard,
            legal_id: '1234567890',
            legal_id_type: 'CC',
          },
          shipping_address: {
            address_line_1: order.address,
            address_line_2: 'Apto 45',
            country: 'CO',
            region: order.state,
            city: order.city,
            name: order.nameOnCard,
            phone_number: '573307654321',
            postal_code: order.zip,
          },
        }),
      },
    );

    const transactionResponse = await transactionRequest.json();

    if (!transactionRequest.ok) {
      throw new BadRequestException('Could not process transaction');
    }

    const timer = Math.floor(Math.random() * 1) + 1000;

    // Intentionally waiting for a random time to simulate a possible failed transaction
    await wait(timer);

    const transactionResultRequest = await fetch(
      `${process.env.PAYMENT_API_URL}/transactions/${transactionResponse.data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PRIVATE_MERCHANT_ID}`,
        },
      },
    );

    const transactionResult = await transactionResultRequest.json();

    if (!transactionResultRequest.ok) {
      throw new BadRequestException('Could not get transaction result');
    }

    if (transactionResult.data.status !== 'APPROVED') {
      await this.ordersService.update({ status: 'CANCELLED' }, initialOrder.id);

      throw new BadRequestException('Transaction was not approved');
    }

    console.log('Transaction worked');

    const createdOrder = await this.ordersService.create(
      initialOrder.id,
      order,
    );

    return createdOrder;
  }
}

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
