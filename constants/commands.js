'use strict'

const issues = require('../api/issues.js')

const commands = {}
commands['-allissues'] = {
  description: '-allIssues <user> <repo>, Lists all issues for a given user/repo',
  handler: (message) => {
     message = message.split(" ")
     return new Promise((resolve,reject) => {
       if (message.length != 3) {
         reject('*Incorrect number of parameters, please try again or type type -h for help*')
       }
       else {
         issues.getIssuesWithFilter(message[1],message[2],"")
          .then(
            result => {
              resolve(result)
            },
            error => {
              reject(error)
            })
        }
      })
  }
}

commands['-openissues'] = {
  description: '-openIssues <user> <repo>, Lists open issues for a given user/repo',
  handler: (message) => {
     message = message.split(" ")
     return new Promise((resolve,reject) => {
       if (message.length != 3) {
         reject('*Incorrect number of parameters, please try again or type type -h for help*')
       }
       else {
         issues.getIssuesWithState(message[1],message[2],"open")
          .then(
            result => {
              resolve(result)
            },
            error => {
              reject("Error finding repository")
            })
        }
      })
  }
}

commands['-closedissues'] = {
  description: '-closedIssues <user> <repo>, Lists closed issues for a given user/repo',
  handler: (message) => {
     message = message.split(" ")
     return new Promise((resolve,reject) => {
       if (message.length != 3) {
         reject('Incorrect number of parameters, please try again or type type -h for help')
       }
       else {
         issues.getIssuesWithState(message[1],message[2],"closed")
          .then(
            result => {
              resolve(result)
            },
            error => {
              reject(error)
            })
        }
      })
  }
}


module.exports = {commands}
