import format from './format.js'

export function handleAction({ logMessages, waitTime, callback }) {
  logMessages.forEach((message) => {
    console.debug(format(message))
  })

  setTimeout(() => {
    callback()
  }, waitTime)
}
