'use strict';
const github = require('octonode');
const client = github.client();

exports.getAllIssues = (user, repo) => {
  repo = repo.trim();
  const ghRepo = client.repo(`${user}/${repo}`);
  return new Promise((resolve,reject) => {
    const issues = [];
    ghRepo.issues((err, data, headers) => {
      for(const issue of data){
      issues.push(issue.title);
    }
    resolve(issues);
    })
  });
}
