import { Column, ForeignKey, BelongsTo, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Company } from '../company/company.model';
import { Department } from '../department/department.model';
import { MailSend } from 'src/email/mail-send.model';
import { toDefaultValue } from 'sequelize/types/utils';
import { SalarySlip } from 'src/Salary/salary-slip.model';
import { PayrollLog } from 'src/payroll/payroll-log.model';


export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  RESIGNED = 'Resigned',
  TERMINATED = 'Terminated',
}

@Table({
  tableName: 'employees', // Ensure the table name matches your DB table name
  timestamps: false, // Assuming your table doesn't use createdAt/updatedAt
})
export class Employee extends Model<Employee> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  city: string;
  

  @Column
  email: string;

  @Column
  phoneNumber: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column
  hiredDate: Date;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  // @ForeignKey(() => Department)
  // @Column
  // departmentid: number;

  // @BelongsTo(() => Department)
  // department: Department;

 @HasMany(() => MailSend)
  mails: MailSend[];
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string; 

  @Column
  salary: Number;

  @Column({
    type: DataType.ENUM(...Object.values(EmployeeStatus)),
    allowNull: false,
    defaultValue: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Adhar Card' })
  file_name: string;
  
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Id Proof' })
  file_type: string;
  
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'C:/Users/parth patel/Downloads/PARTH AADHAR.jpg' })
  file_url: string;
  
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isDepartmentHead: boolean;
  
  @ForeignKey(() => Department)
  @Column
  departmentid: number;


  @BelongsTo(() => Department, { as: 'department' })
  department: Department;

  @HasMany(() => SalarySlip)
  salarySlips: SalarySlip[];

  @Column({ unique: true })
  bank_account_number: string;

  @Column
  bank_ifsc_code: string;

  @Column
  bank_name: string;

  @HasMany(() => PayrollLog)
  payrollLogs: PayrollLog[];


}