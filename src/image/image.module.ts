import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './image.model';
import { ImageService } from '../image/image.service';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
