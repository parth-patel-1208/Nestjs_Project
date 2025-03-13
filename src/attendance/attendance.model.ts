import { Table, Column, Model, ForeignKey, DataType, Default, BelongsTo } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';

@Table({ tableName: 'attendance', timestamps: true })
export class Attendance extends Model<Attendance> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employeeId: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  checkIn: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  checkOut: Date;

  @Column({ type: DataType.STRING, defaultValue: 'Checked-In' })
  status: string;

  @BelongsTo(() => Employee)
  employee: Employee;
}
