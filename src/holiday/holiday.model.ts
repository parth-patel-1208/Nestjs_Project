// holiday.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'holidays' })
export class Holiday extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  holiday_name: string;  // Name of the holiday, e.g., Christmas, New Year

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  holiday_date: Date;  // Date of the holiday

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Public',
  })
  holiday_type: string;  // Type can be 'Public' or 'Company-Specific'
}
