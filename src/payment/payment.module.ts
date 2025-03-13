// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './payment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),  // Register Payment model with Sequelize
  ],
  controllers: [PaymentController],
  providers: [PaymentService],  // Provide PaymentService
  exports: [PaymentService],    // Export PaymentService to be used in other modules
})
export class PaymentModule {}
