'use strict';

const issues = require('../api/issues.js');

const commands = {};
commands['-allissues'] = {
  description: '-allIssues <user> <repo>, Lists all issues for a given user/repo',
};

commands['-openissues'] = {
  description: '-openIssues <user> <repo>, Lists open issues for a given user/repo',
  handler: (message) => {
     message = message.split(" ");
     return new Promise((resolve,reject) => {
       if (message.length != 3) {
         resolve('Im sorry you have the incorrect number of parameters, please try again or type type -h for help')
       }
       else {
         console.log("in the else");
         issues.getIssuesWithState(message[1],message[2],"open")
          .then(
            result => {
              console.log(result);
            });
        }
      });
  }
};

commands['-closedissues'] = {
  description: '-closedIssues <user> <repo>, Lists closed issues for a given user/repo',
};


module.exports = {commands};
