import { Knex } from 'knex'

export type Queryhelper = Knex

export interface Employee {
  readonly employee_id: number
  readonly org_id: number
  readonly first_name: string
  readonly middle_name?: string
  readonly last_name: string
  readonly email_id?: string
  readonly date_of_birth: string
  readonly gender: string
  readonly created_at: Date
  readonly updated_at: Date
}

export interface Organisation {
  readonly org_id: number
  readonly name: string
  readonly description?: string
  readonly primary_contact_email: string
}

export type EmployeeSignUp = Omit<Employee, 'created_at' | 'updated_at'>

export type OrganisationSignUp = Omit<Organisation, 'org_id'>

export interface EmployeesDAO {
  create: (
    employees: readonly EmployeeSignUp[]
  ) => Promise<{ employee_id: number }[]>
}

export interface OrganisationDAO {
  create: (organisation: OrganisationSignUp) => Promise<{ org_id: number }[]>
}

export interface EmployeeService {
  create: (employees: readonly EmployeeSignUp[]) => Promise<{
    failedInserts: {
      employee_id: number
      reason: string
    }[]
    successfulInserts: {
      employee_id: number
    }[]
  }>
}

export interface OrganisationService {
  create: (organisation: OrganisationSignUp) => Promise<
    {
      org_id: number
    }[]
  >
}
