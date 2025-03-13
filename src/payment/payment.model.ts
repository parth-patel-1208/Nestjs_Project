
import { Column, Model, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';  // Import Employee model for the foreign key relationship

@Table({
  tableName: 'payments',  // Explicitly define table name
  timestamps: true,       // Automatically manages createdAt and updatedAt fields
})
export class Payment extends Model {
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
  })
  employee_id: number;  // Foreign Key referring to Employee

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;  // Amount of salary paid

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  bank_account_number: string;  // Bank account number to which payment was made

  @Column(DataType.STRING)
  status: string;  // Add a status field like "Paid" or "Failed"

  @Column(DataType.STRING)
  message: string;  // Add a message field to store transaction message
}
