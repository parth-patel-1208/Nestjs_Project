import { Column, ForeignKey, BelongsTo, HasMany, Model, Table, DataType } from 'sequelize-typescript';
import { Company } from '../company/company.model';
import { Employee } from '../employees/employee.model';

@Table({
  tableName: 'departments', // Ensure the table name matches your DB table name
  timestamps: false, // Assuming your table doesn't use createdAt/updatedAt
})
export class Department extends Model<Department> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Company)
  @Column
  companyid: number;

  @BelongsTo(() => Company)
  company: Company;

   @Column({ type: DataType.STRING,  })
  designation: string;

  @HasMany(() => Employee, { as: 'employees' })
  employees: Employee[]

  @ForeignKey(() => Employee)
  @Column
  department_head_id: number;

  @BelongsTo(() => Employee, { as: 'departmenthead', foreignKey: 'department_head_id' })
  departmenthead: Employee;
 
  
  @Column
  department_head: string; // New column for department head
 
  @Column 
  employee_count: number;

}
