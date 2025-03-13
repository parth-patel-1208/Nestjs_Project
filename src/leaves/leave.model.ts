// leave.model.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';  // Assuming Employee model exists

@Table({ tableName: 'leaves' })  // Ensure the table name is 'leaves' (lowercase)
export class Leave extends Model {
  @ForeignKey(() => Employee)
  @Column(DataType.INTEGER)
  employee_id: number;

  @Column(DataType.STRING)
  leave_type: string;  // e.g., Sick Leave, Paid Leave, Unpaid Leave

  @Column(DataType.DATE)
  start_date: Date;

  @Column(DataType.DATE)
  end_date: Date;

  @Column(DataType.STRING)
  status: string;  // Pending, Approved, Rejected

  @Column(DataType.TEXT)
  reason: string;

  @Column(DataType.INTEGER)
  approved_by: number;  // Admin/Manager ID who approved the leave
}
