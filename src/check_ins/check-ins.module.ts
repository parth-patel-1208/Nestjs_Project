import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CheckIn } from './check-ins.model';
import { CheckInService } from './check-ins.service';
import { CheckInController } from './check-ins.controller';

@Module({
  imports: [SequelizeModule.forFeature([CheckIn])],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
