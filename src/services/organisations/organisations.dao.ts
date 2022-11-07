import { Knex } from 'knex';

import { OrganisationDAO, OrganisationSignUp } from './domain';

export class OrganisationDAOImp implements OrganisationDAO {
  constructor(private db: Knex) {}

  create(organisation: OrganisationSignUp) {
    return this.db('organisations')
      .insert(organisation)
      .onConflict('employee_id')
      .ignore()
      .returning(['org_id']);
  }
  
}
