// shift.model.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';

@Table({ tableName: 'shifts' })
export class Shift extends Model {
  @ForeignKey(() => Employee)
  @Column(DataType.INTEGER)
  employee_id: number;  // Employee for which the shift is assigned

  @Column(DataType.STRING)
  shift_type: string;  // Shift type (e.g., Morning, Evening, Night)

  @Column(DataType.DATEONLY)
  shift_date: Date;  // Date for the shift

  @Column(DataType.STRING)
  status: string;  // Shift status (e.g., Assigned, Completed, Pending)
}
