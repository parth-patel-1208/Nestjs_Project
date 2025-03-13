import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';

@Table({
  tableName: 'user_tokens', // Define table name
  timestamps: true, // Enable timestamps to track token creation
  updatedAt: false,
})
export class UserToken extends Model<UserToken> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Employee)
  @Column({
    field: 'employee_id', // Ensure the database column name matches
  })
  employeeId: number; // Foreign key to Employee model

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string; // Store the JWT token

  @Column({
    field: 'expires_at', // Matches the renamed column in the database
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt: Date; // In the model, use the camelCase convention

  @Column({
    field: 'created_at', // Maps the model field to the database column
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW, // Automatically sets current timestamp
  })
  createdAt: Date; // In the model, use camelCase convention
}
