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

  const getPaginated = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { query } = req;
      const page = query.page ?? 0;
      const size = query.size ?? 5;
      const pageNumeric = Number(page);
      const sizeNumeric = Number(size);
      if (isNaN(pageNumeric)) {
        return res.sendStatus(400);
      }

      if (isNaN(sizeNumeric)) {
        return res.sendStatus(400);
      }

      const result = await services.organisationService.getPaginated(
        pageNumeric,
        sizeNumeric
      );

      res.json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  return {
    create,
    getPaginated
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


  const getByOrgIdPaginated = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> =>{
    try {
  
      const { query ,params} = req;
      const page = query.page ?? 0;
      const size = query.size ?? 5;
      const pageNumeric = Number(page);
      const sizeNumeric = Number(size);
      if (isNaN(pageNumeric)) {
        return res.sendStatus(400);
      }

      if (isNaN(sizeNumeric)) {
        return res.sendStatus(400);
      }

      const orgId = Number(params?.org_id)

      if(isNaN(orgId)){
        return res.sendStatus(400)
      }

      const result = await services.employeeService.getByOrgIdPaginated(
        orgId,
        pageNumeric,
        sizeNumeric
      );

      res.json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  return {
    create,
    getByOrgIdPaginated
  };
};
