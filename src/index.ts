import cors from 'cors'
import express from 'express'

import {knexInstance} from './core/database/knex'
import { logger } from './core/logger'
import { OrganisationHandler } from './services/organisations/api/controllers'
import { EmployeesDAOImp } from './services/organisations/employees.dao'
import { EmployeesValidator } from './services/organisations/employees.validator'
import { OrganisationServiceImp } from './services/organisations/organisation.service'
import { OrganisationDAOImp } from './services/organisations/organisations.dao'

async function startServer() {
  const app = express()
  const port = process.env.PORT || 8080
  const db = await knexInstance()
  const employeeDao = new EmployeesDAOImp(db)
  const organisationDao = new OrganisationDAOImp(db)
  const employeeValidator = new EmployeesValidator(employeeDao)
  const organisationService = new OrganisationServiceImp(organisationDao)
  const organisationHandler = OrganisationHandler({ organisationService })

  app.use(express.json())
  app.use(cors())
  app.get('/health', (req, res) => res.send('Server is running'))

  app.post('/api/organisations', organisationHandler.create)

  app.listen(port, () => {
    logger.info(`server is listening on port ${port}`)
  })
}

startServer()
