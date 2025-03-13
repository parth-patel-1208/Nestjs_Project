// src/payment/payment.service.ts

import { Injectable } from '@nestjs/common';
import { Payment } from './payment.model';  // Ensure you have a Payment model

@Injectable()
export class PaymentService {

  async createPayment(employeeId: number, amount: number, bankAccountNumber: string): Promise<{ status: string, message: string }> {
    // Mock logic for creating payment
    try {
      // Your actual payment processing logic goes here...
      const paymentSuccess = true;  // Set based on your actual payment logic

      // Record the payment in the database (optional)
      await Payment.create({
        employee_id: employeeId,
        amount: amount,
        bank_account_number: bankAccountNumber,
        status: paymentSuccess ? 'Paid' : 'Failed',
      });

      return {
        status: paymentSuccess ? 'Paid' : 'Failed',
        message: paymentSuccess ? 'Salary Transferred Successfully' : 'Salary Transfer Failed',
      };
    } catch (error) {
      return {
        status: 'Failed',
        message: error.message || 'Unexpected Error',
      };
    }
  }
}
