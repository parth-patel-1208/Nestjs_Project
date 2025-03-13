import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';

@Table({
  tableName: 'salary_slips',
  timestamps: true,
})
export class SalarySlip extends Model<SalarySlip> {
  @ForeignKey(() => Employee)
  @Column
  employee_id: number;

  @BelongsTo(() => Employee)
  employee: Employee;

  @Column({ type: DataType.STRING, allowNull: false })
  month: string; // e.g., "February 2025"

  @Column({ type: DataType.DECIMAL(10,2), allowNull: false })
  basic_salary: number;

  @Column({ type: DataType.DECIMAL(10,2), allowNull: false })
  totaldeductions: number;

  @Column({ type: DataType.DECIMAL(10,2), allowNull: false })
  net_salary: number;

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @Column({ type: DataType.DECIMAL(10,2), allowNull: false})
  tax_amount: number;

  @Column({ type: DataType.DECIMAL(10,2), allowNull:false})
  pf_amount: number;

  @Column({ type: DataType.DECIMAL(10,2), allowNull: false})
  professional_tax: number;


}
