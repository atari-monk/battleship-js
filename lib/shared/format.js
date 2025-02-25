import { ConsoleFormatter } from './ConsoleFormatter.js'

const format = new ConsoleFormatter()
export default format.log.bind(format)
