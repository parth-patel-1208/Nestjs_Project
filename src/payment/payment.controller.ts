// src/payment/payment.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async Payment(@Body() PaymentDto: PaymentDto) {
    const { employee_id, amount, bank_account_number } = PaymentDto;

    const result = await this.paymentService.createPayment(employee_id, amount, bank_account_number);
    return result;
  }
}
