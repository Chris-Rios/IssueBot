'use strict'

const RtmClient = require('@slack/client').RtmClient
const RTM_EVENTS = require('@slack/client').RTM_EVENTS
const config = require('./config/config.js')
const greetingMessages = require('./constants/greetings.js').greetingMessages
const commands = require('./constants/commands.js').commands
const greetingResponses = require('./constants/greetings.js').greetingResponses

const botToken = config.slack.chatToken

const rtm = new RtmClient(botToken)

rtm.start()

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage (message) {
  const response = handleMessage(message.text, message.channel)

  rtm.sendMessage(`${response}`, message.channel)
})

const handleMessage = (message, channel) => {
  console.log(message)
  message = message.toLowerCase()
  const messageStart = message.split(' ')[0]
  let response = 'I don\'t understand your message, type -h for help'

  if (greetingMessages.indexOf(messageStart) !== -1) {
    return greetingResponses[Math.floor(Math.random() * greetingResponses.length)]
  }

  if (messageStart === '-h') {
    response = '>>Here is a list of some commands:'
    for (const command of Object.keys(commands)) {
      response = `${response}\n ${commands[command].description}`
    }
  }

  if (Object.keys(commands).indexOf(messageStart) !== -1) {
    const command = commands[messageStart]
    command.handler(message).then(
      results => {
        if (results.length === 0) {
          rtm.sendMessage('No results found!', channel)
        }

        for (const result in results) {
          if (result >= 10) {
            rtm.sendMessage('>*Currently I am only displaying the first 10 issues*')
            break
          }
          rtm.sendMessage(`>#${results[result].number}-${results[result].title}`, channel)
        }
      },
      error => {
        console.log('There has been an error' + error)
        rtm.sendMessage(`Im sorry there has been an error with your request: *${error}*`, channel)
      }
    )
    response = 'Sure Thing!'
  }

  return response
}
