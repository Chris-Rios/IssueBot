'use strict';
const github = require('octonode');
const client = github.client();

exports.getAllIssues = (user, repo) => {
  const ghsearch = client.search();
  const query = `repo:${user}/${repo}+type:issue`;
  return _SearchIssues(query);
}

const _SearchIssues = (query) => {
  const ghsearch = client.search();
  return new Promise((resolve,reject) => {
    const issues = [];
    const request =
      {
        q: query,
        sort: 'created',
        order: 'asc'
      };
    ghsearch.issues(request, (err, data, headers) => {
        if(err) {
          reject(err);
        }
        else {
          for (const issue of data.items) {
          issues.push (
            {
              title: issue.title,
              number: issue.number
            }
          );
        }
        resolve(issues);
      }
    });
  });
}
