import { TYPE, LEVEL, CONSOLE_COLOR } from './constants.js'

export class ConsoleFormatter {
  constructor() {
    this._counters = {}
    this._minLogLevel = LEVEL.DEBUG
    const { CYAN, YELLOW, RED, RESET } = CONSOLE_COLOR
    this._colorMap = {
      [LEVEL.DEBUG]: CYAN,
      [LEVEL.WARN]: YELLOW,
      [LEVEL.ERROR]: RED,
      reset: RESET,
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

  log(levelOrMessage, ...args) {
    let level = this._minLogLevel
    if (Object.values(LEVEL).includes(levelOrMessage)) {
      level = levelOrMessage
    } else {
      args.unshift(levelOrMessage)
    }

    if (!Object.values(LEVEL).includes(level)) {
      console.warn(
        `⚠️ Invalid log level: "${level}". Defaulting to LEVEL.DEBUG.`
      )
      level = LEVEL.DEBUG
    }

    if (!this.shouldLog(level)) return

    this._counters[level] = (this._counters[level] ?? 0) + 1

    const formattedArgs = args.map((arg) => {
      if (arg === null) return TYPE.NULL
      if (arg instanceof Error) return arg.stack || arg.message
      if (typeof arg === TYPE.OBJECT) return JSON.stringify(arg, null, 2)
      return String(arg)
    })

    const message = `${this._counters[level]}. ${formattedArgs.join(' ')}`

    const color = this._colorMap[level] ?? this._colorMap.reset
    return `${color}${message}${this._colorMap.reset}`
  }
}
