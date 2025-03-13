import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image) private readonly imageModel: typeof Image,
  ) {}

  // Create a new image
  async create(imageData: Partial<Image>): Promise<Image> {
    return this.imageModel.create(imageData);
  }

  // Get all images
  async findAll(): Promise<Image[]> {
    return this.imageModel.findAll();
  }

  // Get an image by ID
  async findOne(id: number): Promise<Image> {
    const image = await this.imageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  // Update an image by ID
  async update(id: number, updateData: Partial<Image>): Promise<Image> {
    const image = await this.imageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image.update(updateData);
  }

  // Delete an image by ID
  async delete(id: number): Promise<void> {
    const image = await this.imageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    await image.destroy();
  }
}
