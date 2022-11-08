import {
  OrganisationDAO,
  OrganisationService,
  OrganisationSignUp,
} from './domain'

export class OrganisationServiceImp implements OrganisationService {
  constructor(private dao: OrganisationDAO) {}

  create(organisation: OrganisationSignUp) {
    return this.dao.create(organisation)
  }
}
