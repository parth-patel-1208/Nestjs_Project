import { Module } from '@nestjs/common';
import { MailService } from './mail-send.service';
import { MailSendController } from './mail-send.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailSend } from './mail-send.model';


@Module({
  imports: [SequelizeModule.forFeature([MailSend])],
  controllers: [MailSendController],
  providers: [MailService],
  // exports: [MailService],
})
export class MailModule {}
