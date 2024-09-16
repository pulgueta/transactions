import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { OrdersService } from '@/application/services/order.service';
import { CreateOrderDTO } from '@/domain/dto/order.dto';
import { OrderEntity } from '@/domain/entities/order.entity';
import { FetcherService } from '@/application/services/fetcher.service';
import { AcceptanceTokenResponse } from '@/types/acceptance-token';
import { CardTokenResponse } from '@/types/card-token';
import { TransactionResponse } from '@/types/transaction';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly fetcher: FetcherService,
  ) {}

  @Get('/:name')
  @ApiOkResponse({ type: [OrderEntity] })
  async getAllOrders(@Param('name') name: string) {
    const orders = await this.ordersService.findAll(name);

    return orders;
  }

  @Post('/')
  @ApiOkResponse({ type: OrderEntity })
  @ApiBadRequestResponse({ description: 'Invalid data sent' })
  async createOrder(@Body() order: CreateOrderDTO) {
    if (!order) {
      throw new BadRequestException('Invalid data sent');
    }

    const initialOrder = await this.ordersService.createInitialOrder(
      order.nameOnCard ?? '',
    );

    const queryAcceptanceToken =
      await this.fetcher.get<AcceptanceTokenResponse>(
        `/merchants/${process.env.PUBLIC_MERCHANT_ID}`,
      );

    const acceptance_token =
      queryAcceptanceToken.data.presigned_acceptance.acceptance_token;

    const cardToken = await this.fetcher.post<CardTokenResponse>(
      `/tokens/cards`,
      {
        number: order.cardInfo,
        cvc: order.cvv,
        exp_month: order.expiryDate?.slice(0, 2),
        exp_year: order.expiryDate?.slice(3, 5),
        card_holder: order.nameOnCard,
      },
    );

    const str = `${initialOrder.id}${order.orderTotal! * 1000}COP${process.env.PRIVATE_INTEGRITY_KEY}`;

    const encondedText = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const transactionRequest = await this.fetcher.post<TransactionResponse>(
      '/transactions',
      {
        acceptance_token,
        reference: initialOrder.id,
        amount_in_cents: order.orderTotal! * 1000,
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
      },
      true,
    );

    const timer = Math.floor(Math.random() * 1500) + 1500;

    // Intentionally waiting for a random time to simulate a possible failed transaction
    await wait(timer);

    const transactionResult = await this.fetcher.get<TransactionResponse>(
      `/transactions/${transactionRequest.data.id}`,
      true,
    );

    if (transactionResult.data.status !== 'APPROVED') {
      await this.ordersService.cancel(initialOrder.id);

      throw new BadRequestException('Transaction was not approved');
    }

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
