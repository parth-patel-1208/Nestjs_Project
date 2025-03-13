import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Department } from '../department/department.model';
import { Employee } from '../employees/employee.model';

@Table({
  tableName: 'company', // Ensure the table name matches your DB table name
  timestamps: false, // Assuming your table doesn't use createdAt/updatedAt
})
export class Company extends Model<Company> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  location: string;

  @HasMany(() => Employee)
  employees: Employee[];

  @HasMany(() => Department)
  departments: Department[];
}
