import { Knex } from 'knex'

import {
  Employee,
  EmployeeSignUp,
  Organisation,
  OrganisationSignUp,
} from './domain'

const organisations = (table: Knex.TableBuilder) => {
  table.increments('org_id').primary()
  table.string('name').notNullable()
  table.string('description')
  table.string('primary_contact_email').notNullable().unique()
  table.timestamps(false, true)
}

const employees = (table: Knex.TableBuilder) => {
  table.integer('employee_id').primary()
  table.integer('org_id').notNullable()
  table.string('first_name').notNullable()
  table.string('middle_name')
  table.string('last_name').notNullable()
  table.string('email_id')
  table.string('date_of_birth').notNullable()
  table.string('gender').notNullable()
  table.foreign('org_id').references('organisations.org_id')
  table.timestamps(false, true)
}

export default {
  organisations,
  employees,
}

declare module 'knex/types/tables' {
  interface Tables {
    readonly employees: Knex.CompositeTableType<Employee, EmployeeSignUp>
    readonly organisations: Knex.CompositeTableType<
      Organisation,
      OrganisationSignUp
    >
  }
}
