'use strict'
const github = require('octonode')
const client = github.client()

const _SearchIssues = (query) => {
  const ghsearch = client.search()
  return new Promise((resolve,reject) => {
    const issues = []
    const request =
      {
        q: query,
        sort: 'created',
        order: 'asc'
      }
    ghsearch.issues(request, (err, data, headers) => {
        if(err) {
          console.log(`Error encountered: ${err.message} error code: ${err.statusCode}`)
          reject(err)
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
        resolve(issues)
      }
    })
  })
}

exports.getIssuesWithFilter = (user, repo, filter) => {
  const query = `repo:${user}/${repo}+type:issue+${filter}`
  return _SearchIssues(query)
}

exports.getIssuesWithState = (user, repo, state) => {
  const query = `repo:${user}/${repo}+type:issue+state:${state}`
  return _SearchIssues(query)
}
