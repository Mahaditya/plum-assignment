import { Knex } from 'knex';

import { EmployeesDAO, EmployeeSignUp } from './domain';

export class EmployeesDAOImp implements EmployeesDAO {
  constructor(private db: Knex) {}

  create(employees: readonly EmployeeSignUp[]) {
    return this.db('employees')
      .insert(employees)
      .onConflict('employee_id')
      .ignore()
      .returning(['employee_id']);
  }

  getByOrgIdPaginated(orgId: number, page = 0, size = 5) {
    return this.db('employees')
      .where('org_id', orgId)
      .orderBy('employee_id', 'asc')
      .limit(size)
      .offset(page);
  }
}
