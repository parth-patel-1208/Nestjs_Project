import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './image.model';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // Create a new image
  @Post()
  async create(@Body() imageData: Partial<Image>): Promise<Image> {
    return this.imageService.create(imageData);
  }

  // Get all images
  @Get()
  async findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  // Get an image by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Image> {
    return this.imageService.findOne(id);
  }

  // Update an image by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Image>,
  ): Promise<Image> {
    return this.imageService.update(id, updateData);
  }

  // Delete an image by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.imageService.delete(id);
  }
}
