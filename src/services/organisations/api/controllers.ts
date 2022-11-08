import { NextFunction, Request, Response } from 'express';

import { logger } from '../../../core/logger';
import { OrganisationService } from '../domain';

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

      logger.debug({ body });
      if (!body.name) {
        return res
          .sendStatus(400)
          .send('Name of the organisations is a required');
      }

      if (!body.primary_contact_email) {
        return res
          .sendStatus(400)
          .send('Primary Contact Email of Organisation is required');
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
