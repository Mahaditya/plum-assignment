import { logger } from '../../core/logger';

import { EmployeeService, EmployeeSignUp } from './domain';

export class EmployeeServiceImp implements EmployeeService {
  constructor(private validator: EmployeeService) {}

  create(employees: readonly EmployeeSignUp[], orgId: number) {
    logger.debug(employees);
    return this.validator.create(employees, orgId);
  }

  getByOrgIdPaginated(orgId: number, page: number, size: number) {
    return this.validator.getByOrgIdPaginated(orgId, page, size);
  }
}
