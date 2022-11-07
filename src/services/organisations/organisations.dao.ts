import { EmployeeSignUp, OrganisationSignUp, Queryhelper } from './domain';

const createOrganisation = (db: Queryhelper) => (organisation: OrganisationSignUp) => {
  return db('organisations').insert(organisation).onConflict('employee_id').ignore();
};

const createOrganisationBulk =
  (db: Queryhelper) => (employees: readonly EmployeeSignUp[]) => {
    return db('employees').insert(employees).onConflict('employee_id').ignore();
  };

export const OrganisationsDAO = {
  createOrganisation,
  createOrganisationBulk,
};
