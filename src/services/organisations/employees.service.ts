import { EmployeeService, EmployeeSignUp } from './domain';

export class EmployeeServiceImp implements EmployeeService {
  constructor(private validator: EmployeeService) {}

  create(employees: readonly EmployeeSignUp[]){
    return this.validator.create(employees)
  }
}
