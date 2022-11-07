import { EmployeeSignUp, Queryhelper } from './domain';

const createEmployee = (db: Queryhelper) => (employee: EmployeeSignUp) => {
  return db('employees').insert(employee).onConflict('employee_id').ignore();
};

const createEmployeeBulk =
  (db: Queryhelper) => (employees: readonly EmployeeSignUp[]) => {
    return db('employees').insert(employees).onConflict('employee_id').ignore();
  };

export const EmployeesDAO = {
  createEmployee,
  createEmployeeBulk,
};
