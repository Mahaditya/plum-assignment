import { Knex } from 'knex'

import { OrganisationDAO, OrganisationSignUp } from './domain'

export class OrganisationDAOImp implements OrganisationDAO {
  constructor(private db: Knex) {}

  create(organisation: OrganisationSignUp) {
    return this.db('organisations')
      .insert(organisation)
      .returning(['org_id'])
  }
}
