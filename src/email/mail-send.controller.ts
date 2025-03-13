import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail-send.service';

@Controller('mail-send')
export class MailSendController {
  constructor(private readonly mailService: MailService) {}
  @Post('send-otp')
  async sendOtp(
    @Body('employeeId') employeeId: number,  // employeeId will be parsed as a number
    @Body('email') email: string,            // email will be parsed as a string
  ): Promise<{ message: string }> {
    // console.log('Employee ID:', employeeId);  // For debugging
    // console.log('Email:', email);  // For debugging

    return await this.mailService.sendOtpEmail(employeeId, email); // Call service
  }
}





 