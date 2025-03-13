import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import { InjectModel } from '@nestjs/sequelize';
import { MailSend } from './mail-send.model'; // Import the model
import { EmailData } from './mail-send.interface'; // Import the interface
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    @InjectModel(MailSend) private readonly mailSendModel: typeof MailSend,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'parthpatel3958@gmail.com', // Replace with your email
        pass: 'lfuv vmbm wrks mxgb', // Replace with your email password or app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Setup Handlebars templating
    this.transporter.use(
      'compile',
      nodemailerExpressHandlebars({
        viewEngine: {
          extName: '.hbs',
          layoutsDir: path.resolve('C:/Users/parth patel/empdata/src/email/'), // Main directory
          partialsDir: path.resolve('C:/Users/parth patel/empdata/src/email/'), // If you have partials
          defaultLayout: '',
        },
        viewPath: path.resolve('C:/Users/parth patel/empdata/src/email/'), // Directory containing templates
        extName: '.hbs',
      }),
    );
  }

  async sendOtpEmail(employeeId: number, to: string): Promise<{ message: string }> {
    const subject = 'Your OTP Code';
    const companyName = 'Patel Integrated Logistics';

    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const emailData: EmailData = {
        to,
        otp,
        companyName,
        email: to,
        year: new Date().getFullYear(),
        address: 'Your Address Here',
        city: 'Ahmedabad',
        zipCode: '380059',
        country: 'India',
      };

      await this.transporter.sendMail({
        to: emailData.to,
        subject,
        template: 'otp-verification-email-template', // Handlebars template name (without .hbs)
        context: emailData, // Dynamic content for the template
        attachments: [
          {
            filename: 'user.pdf', // Name of the PDF file in the email
            path: path.resolve(
              'C:/Users/parth patel/Downloads/SignedDocument (2).pdf',
            ), // Correct path to the PDF file
          },
          {
            filename: 'user-image.png', // Image of user
            path: path.resolve(
              'C:/Users/parth patel/Downloads/email.png',
            ),
          },
        ],
      });

      console.log(`Email sent to ${to}`);

      // Save OTP to the database with employeeId
      await this.mailSendModel.create({ email: emailData.to, otp, employeeId });

      return { message: `OTP sent successfully to ${emailData.to}` };
    } catch (error) {
      console.error(`Failed to send OTP: ${error.message}`);
      throw error;
    }
  }
}
