import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'image',
  timestamps: false,
})
export class Image extends Model<Image> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  imagePath: string;
}
