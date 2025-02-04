class LogService {
  constructor() {
    this.debugNr = 1
    this.warnNr = 1
    this.errorNr = 1

    this.debug = console.debug.bind(console)
    this.warn = console.warn.bind(console)
    this.error = console.error.bind(console)
  }

  debug(log) {
    console.debug(`${this.debugNr}. ${log}`)
    this.debugNr++
  }

  warn(log) {
    console.warn(`${this.warnNr}. ${log}`)
    this.warnNr++
  }

  error(log, error) {
    console.error(`${this.errorNr}. ${log}`, error)
    this.errorNr++
  }
}

export const logger = new LogService()
