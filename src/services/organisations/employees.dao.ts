import { Knex } from 'knex'

import { EmployeesDAO, EmployeeSignUp } from './domain'

export class EmployeesDAOImp implements EmployeesDAO {
  constructor(private db: Knex) {}

  create(employees: readonly EmployeeSignUp[]) {
    return this.db('employees')
      .insert(employees)
      .onConflict('employee_id')
      .ignore()
      .returning(['employee_id'])
  }
}
