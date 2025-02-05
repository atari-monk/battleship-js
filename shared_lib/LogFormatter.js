class LogFormatter {
  constructor() {
    this.counters = {
      debug: 1,
      warn: 1,
      error: 1,
    }
  }

  debug(...args) {
    const count = this.counters.debug++
    return [`${count}.`, ...args]
  }

  warn(...args) {
    const count = this.counters.warn++
    return [`${count}.`, ...args]
  }

  error(...args) {
    const count = this.counters.error++
    return [`${count}.`, ...args]
  }
}

export const format = new LogFormatter()
