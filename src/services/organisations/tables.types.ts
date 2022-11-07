import { Knex } from 'knex'

import {
  Employee,
  EmployeeSignUp,
  Organisation,
  OrganisationSignUp,
} from './domain';

declare module 'knex/types/tables' {
  interface Tables {
    readonly employees: Knex.CompositeTableType<Employee, EmployeeSignUp>;
    readonly organisations: Knex.CompositeTableType<Organisation, OrganisationSignUp>;
  }
}
