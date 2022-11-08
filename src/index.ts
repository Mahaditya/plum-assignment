import cors from 'cors';
import csvHandler from 'csvtojson';
import express from 'express';

import { knexInstance } from './core/database/knex';
import { logger } from './core/logger';
import { errorHandler } from './middlewares/error';
import { EmployeeHandler } from './services/organisations/api/employees.controller';
import { OrganisationHandler } from './services/organisations/api/organisations.controller';
import { EmployeeCSVParserImp } from './services/organisations/csv.parser';
import { EmployeesDAOImp } from './services/organisations/employees.dao';
import { EmployeeServiceImp } from './services/organisations/employees.service';
import { EmployeesValidator } from './services/organisations/employees.validator';
import { OrganisationServiceImp } from './services/organisations/organisation.service';
import { OrganisationDAOImp } from './services/organisations/organisations.dao';

async function startServer() {
  const app = express();
  const port = process.env.PORT || 8080;
  const db = await knexInstance();
  const employeeDao = new EmployeesDAOImp(db);
  const organisationDao = new OrganisationDAOImp(db);
  const employeeValidator = new EmployeesValidator(employeeDao);
  const organisationService = new OrganisationServiceImp(organisationDao);
  const employeeService = new EmployeeServiceImp(employeeValidator);
  const organisationHandler = OrganisationHandler({ organisationService });

  const employeeCSVParser = new EmployeeCSVParserImp(csvHandler);
  const employeeHandler = EmployeeHandler({
    employeeService,
    employeeCSVParser,
  });

  app.use(express.json());
  app.use(cors());
  app.get('/health', (req, res) => res.send('Server is running'));

  app.post('/api/organisations', organisationHandler.create);

  app.post('/api/organisations/:org_id/members/upload', employeeHandler.create);

  app.get('/api/organisations', organisationHandler.getPaginated);

  app.get(
    '/api/organisations/:org_id/members',
    employeeHandler.getByOrgIdPaginated
  );

  app.use(errorHandler);

  app.listen(port, () => {
    logger.info(`server is listening on port ${port}`);
  });
}

startServer();
