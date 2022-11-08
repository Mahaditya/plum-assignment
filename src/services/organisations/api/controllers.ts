import { NextFunction, Request, Response } from 'express';

import { logger } from '../../../core/logger';
import {
  EmployeeCSVParser,
  EmployeeService,
  EmployeeSignUp,
  OrganisationService,
} from '../domain';

export const OrganisationHandler = (services: {
  organisationService: OrganisationService;
}) => {
  const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { body } = req;

      if (!body.name) {
        return res.status(400);
      }

      if (!body.primary_contact_email) {
        return res.status(400);
      }

      const organisationSignUpPayload = {
        name: body.name,
        description: body.description,
        primary_contact_email: body.primary_contact_email,
      };

      const response = await services.organisationService.create(
        organisationSignUpPayload
      );
      return res.json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    create,
  };
};

export const EmployeeHandler = (services: {
  employeeService: EmployeeService;
  employeeCSVParser: EmployeeCSVParser;
}) => {
  const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      logger.debug({ req });
      const { body, params } = req;

      const org_id = params.org_id;

      if (!org_id) {
        return res.sendStatus(400);
      }

      logger.debug({ body });

      const employeesSignUpPayload = await services.employeeCSVParser.parse(
        body.csv
      );

      const orgIdNumeric = Number(org_id);

      if (isNaN(orgIdNumeric)) {
        res.sendStatus(400);
      }

      const response = await services.employeeService.create(
        employeesSignUpPayload as EmployeeSignUp[],
        orgIdNumeric
      );
      return res.json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    create,
  };
};
