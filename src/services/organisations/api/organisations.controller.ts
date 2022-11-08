import { NextFunction, Request, Response } from 'express';

import {
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