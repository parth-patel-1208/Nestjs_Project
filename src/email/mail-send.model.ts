import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from 'src/employees/employee.model';

@Table({
  tableName: 'mail_sends',
  timestamps: false, // Disable createdAt and updatedAt
})
export class MailSend extends Model {
  @Column
  email: string;

  @Column
  otp: string;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @BelongsTo(() => Employee)
  employee: Employee;
}



