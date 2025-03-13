import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model'; // Reference Employee Model

@Table({ tableName: 'payroll_adjustments' })
export class PayrollAdjustment extends Model<PayrollAdjustment> {

    @Column({ 
        type: DataType.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      })
      id: number;  // Ensure this exists
  
  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employee_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number;

  @Column({ type: DataType.ENUM('bonus', 'deduction', 'overtime'), allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;
}
