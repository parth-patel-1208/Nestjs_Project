import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';  // Adjust the path if needed

@Table({ tableName: 'check_ins', timestamps: false })
export class CheckIn extends Model<CheckIn> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employee_id: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  check_in: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  check_out: Date;

  @Column({ type: DataType.STRING, defaultValue: 'Checked-In' })
  status: string;

  @BelongsTo(() => Employee)
  employee: Employee;
}
