import { EmployeesDAO, EmployeeService, EmployeeSignUp } from './domain'
import {
  isValidDateOfBirth,
  isValidEmailAddress,
  isValidGender,
  isValidName,
} from './utils'

export class EmployeesValidator implements EmployeeService {
  constructor(private dao: EmployeesDAO) {}

  async create(employees: readonly EmployeeSignUp[]) {
    const parsedEmployees = employees.reduce(
      (inserts, employee) => {
        const parsedEmployee = this.parseEmployee(employee)
        if (parsedEmployee.parsed) {
          return {
            ...inserts,
            validEmployees: [...inserts.validEmployees, employee],
          }
        }
        return {
          ...inserts,
          invalidEmployees: [...inserts.invalidEmployees, parsedEmployee],
        }
      },
      {
        invalidEmployees: [],
        validEmployees: [] as EmployeeSignUp[],
      }
    )

    const insertedEmployees = await this.dao.create(
      parsedEmployees.validEmployees
    )

    const insertedEmployeeIds = insertedEmployees.map(
      (employee) => employee.employee_id
    )

    const initialValidEmployeeIds = parsedEmployees.validEmployees.map(
      (employee) => employee.employee_id
    )

    const rejectedEmployeeIdsInserts = initialValidEmployeeIds.filter(
      (employee_id) => !insertedEmployeeIds.includes(employee_id)
    )

    const duplicateInserts = rejectedEmployeeIdsInserts.map((employee_id) => ({
      employee_id,
      reason: 'Employee Id Not Unique',
    }))

    return {
      successfulInserts: insertedEmployeeIds.map((employee_id) => ({
        employee_id,
      })),
      failedInserts: [...duplicateInserts, ...parsedEmployees.invalidEmployees],
    }
  }

  parseEmployee(employee: EmployeeSignUp) {
    if (employee?.email_id) {
      if (!isValidEmailAddress(employee.email_id)) {
        return {
          employee_id: employee.employee_id,
          reason: 'Invalid Email Address',
        }
      }
    }
    if (!employee.date_of_birth) {
      return {
        employee_id: employee.employee_id,
        reason: 'Date of birth not provided',
      }
    }
    if (!isValidDateOfBirth(employee.date_of_birth)) {
      return {
        employee_id: employee.employee_id,
        reason: 'Invalid Date of Birth',
      }
    }
    if (!employee.first_name) {
      return {
        employee_id: employee.employee_id,
        reason: 'First Name not provided',
      }
    }

    if (!isValidName(employee.first_name)) {
      return {
        employee_id: employee.employee_id,
        reason: 'First Name is invalid. Expects at least 3 alphabets',
      }
    }

    if (employee.middle_name) {
      if (!isValidName(employee.middle_name)) {
        return {
          employee_id: employee.employee_id,
          reason: 'Middle Name is invalid. Expects at least 3 alphabets',
        }
      }
    }

    if (!employee.last_name) {
      return {
        employee_id: employee.employee_id,
        reason: 'Last Name not provided',
      }
    }

    if (isValidName(employee.last_name)) {
      return {
        employee_id: employee.employee_id,
        reason: 'Last Name is invalid. Expects at least 3 alphabets',
      }
    }

    if (!employee.gender) {
      return {
        employee_id: employee.employee_id,
        reason: 'Gender Name not provided',
      }
    }

    if (!isValidGender(employee.gender)) {
      return {
        employee_id: employee.employee_id,
        reason:
          "Invalid Gender provided. Gender should be either of these, 'Male','Female','Others'",
      }
    }

    return {
      employee,
      parsed: true,
    }
  }
}
