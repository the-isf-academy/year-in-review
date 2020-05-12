require('dotenv').config()

const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");

console.log(process.env.GITHUB_PRIVATE_KEY);

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    id: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY
  }
});

const useroctokit = new Octokit({
  auth: appOctokit.auth( {
    type: "installation",
    installationId:
  })
});

console.log(process.env.GITHUB_APP_ID);

async function getUsers() {
    var users = await appOctokit.users.list();
    return users;
}

console.log(getUsers());
