

import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';  // Import Employee model

@Table({
  tableName: 'payroll_logs',  // Explicitly define table name
  timestamps: true,           // Enables createdAt & updatedAt fields
})
export class PayrollLog extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;  // Primary Key

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'employeeid',
  })
  employeeId: number;  // Foreign Key (Employee ID)

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;  // Salary Amount

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;  // "Paid" or "Failed"

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  message: string;  // Error or success message
}
