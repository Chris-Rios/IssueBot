'use strict';

const rtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const userInfo = require('./api/issues');
const config = require('./config/config.js');
const greetingMessages = require('./constants/greetings.js').greetingMessages;
const commands = require('./constants/commands.js').commands;
const greetingResponses = require('./constants/greetings.js').greetingResponses;
const issues = require('./api/issues.js');

const botToken = config.slack.chatToken;

const rtm = new rtmClient(botToken);

rtm.start();



rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

 const response = handleMessage(message.text,message.channel);

 rtm.sendMessage(`${response}`, message.channel);
});


const handleMessage = (message, channel) => {
  message = message.toLowerCase();
  if (greetingMessages.indexOf(message) !== -1) {
    return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
  }

  if (message === "-h") {
    let message = `>>>Here are a list of some commands:`
    for (const command of commands) {
      message = `${message}\n ${command}`;
    }
    return message
  }

  if (message.toLowerCase().startsWith("-allissues")) {
    message = message.split(" ");
    if (message.length != 3) {
      return("Im sorry you have the incorrect number of parameters, please try again or type type -h for help");
    }
    
    issues.getAllIssues(message[1],message[2]).then((result) => {
        for(const issue of result) {
          rtm.sendMessage(`> #${issue.number}-${issue.title}`,channel);
        }
      },
      error => {
        rtm.sendMessage(`Sorry I was unable to get issues for you!`, channel);
      }
    );
    return "Sure Thing!";
  }

  return 'I don\'t understand your message, type -h for help';
}
