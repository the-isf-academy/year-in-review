var fs = require("fs");
var githubToken = fs.readFileSync("./tokens.txt").toString('utf-8').trim();
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    auth: githubToken,
    userAgent: 'Year in Review v0.0.1',
    log: console,
});

async function getUsers() {
    var users = await octokit.orgs .listMembers({
        org: "the-isf-academy",
    });
    console.log(users);
    return users;
}

var users = console.log(getUsers());

console.log(users);
