const rtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const github = require('octonode');
const client = github.client();
const userInfo = require('./api/issues');
const config = require('./config/config.js');
const greetingMessages = require('./constants/greetings.js').greetingMessages;
const greetingResponses = require('./constants/greetings.js').greetingResponses;

const botToken = config.slack.chatToken;

console.log(botToken);

const rtm = new rtmClient(botToken);

rtm.start();



rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

 const response = handleMessage(message.text,message.channel);

  rtm.sendMessage(`${response}`, message.channel);
});


const handleMessage = (message, channel) => {
  message = message.toLowerCase();
  if (greetingMessages.indexOf(message)) {
    return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
  }

  return message;
}
