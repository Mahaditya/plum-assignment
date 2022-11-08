const log  = (data) => console.log(data)

export const logger = {
    info: log,
    debug: log,
    error: log,
    warn: log
}