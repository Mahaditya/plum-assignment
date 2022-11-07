import { Knex } from 'knex';

export type Queryhelper = Knex;

export interface Employee {
  readonly employee_id: number;
  readonly org_id: number;
  readonly first_name: string;
  readonly middle_name?: string;
  readonly last_name: string;
  readonly email_id?: string;
  readonly date_of_birth: string;
  readonly gender: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export interface Organisation {
  readonly org_id: number;
  readonly name: string;
  readonly description?: string;
  readonly primary_contact_email: string;
}

export type EmployeeSignUp = Omit<Employee,'employee_id'| 'created_at'|'updated_at'>

export type OrganisationSignUp = Omit<Organisation,'org_id'>