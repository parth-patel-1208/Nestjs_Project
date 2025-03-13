// src/payment/create-payment.dto.ts

import { IsNotEmpty, IsInt, IsString, IsDecimal } from 'class-validator';

export class PaymentDto {
  @IsInt()
  @IsNotEmpty()
  employee_id: number;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  bank_account_number: string;
}
