class LogService {
  constructor() {
    this.debugNr = 1
    this.warnNr = 1
  }

  debug(log) {
    console.debug(`${this.debugNr}. ${log}`)
    this.debugNr++
  }

  warn(log) {
    console.warn(`${this.warnNr}. ${log}`)
    this.warnNr++
  }
}

export const logger = new LogService()
