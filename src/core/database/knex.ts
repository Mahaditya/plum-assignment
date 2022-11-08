import dotenv from 'dotenv'
import knex from 'knex'

export const knexInstance = async ()=>{
    dotenv.config()
    const  config =  (await import('../config/knexfile')).default
   return  knex(config.production)
}