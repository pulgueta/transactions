import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetcherService {
  private readonly baseUrl: string = process.env.PAYMENT_API_URL || '';

  async get<T>(endpoint: string, isPrivate: boolean = false): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: isPrivate
          ? `Bearer ${process.env.PRIVATE_MERCHANT_ID}`
          : `Bearer ${process.env.PUBLIC_MERCHANT_ID}`,
      },
    });

    if (!res.ok) {
      throw new BadRequestException(res.statusText);
    }

    return await res.json();
  }

  async post<T>(
    endpoint: string,
    body: Record<string, unknown>,
    isPrivate: boolean = false,
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: isPrivate
          ? `Bearer ${process.env.PRIVATE_MERCHANT_ID}`
          : `Bearer ${process.env.PUBLIC_MERCHANT_ID}`,
      },
    });

    if (!res.ok) {
      throw new BadRequestException(res.statusText);
    }

    return await res.json();
  }
}
