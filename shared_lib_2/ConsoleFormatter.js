import { LEVEL, CONSOLE_COLOR } from './constants.js'

export class ConsoleFormatter {
  constructor() {
    this._counters = {}
    this._minLogLevel = LEVEL.debug
    const { cyan, yellow, red, reset } = CONSOLE_COLOR
    this._colorMap = {
      [LEVEL.debug]: cyan,
      [LEVEL.warn]: yellow,
      [LEVEL.error]: red,
      reset: reset,
    }
  }

  setLogLevel(level) {
    if (Object.values(LEVEL).includes(level)) {
      this._minLogLevel = level
    } else {
      console.warn(
        `Invalid log level: ${level}. Keeping level as ${this._minLogLevel}.`
      )
    }
    return this
  }

  shouldLog(level) {
    const logLevels = Object.values(LEVEL)
    return logLevels.indexOf(level) >= logLevels.indexOf(this._minLogLevel)
  }

  log(level = this._minLogLevel, ...args) {
    if (!Object.values(LEVEL).includes(level)) {
      console.warn(
        `⚠️ Invalid log level: "${level}". Defaulting to LEVEL.debug.`
      )
      level = LEVEL.debug
    }

    if (!this.shouldLog(level)) return

    this._counters[level] = (this._counters[level] ?? 0) + 1

    const formattedArgs = args.map((arg) => {
      if (arg === null) return 'null'
      if (typeof arg === 'object') return JSON.stringify(arg, null, 2)
      return String(arg)
    })

    const message = `${this._counters[level]}. ${formattedArgs.join(' ')}`

    const color = this._colorMap[level] ?? this._colorMap.reset
    return `${color}${message}${this._colorMap.reset}`
  }
}
