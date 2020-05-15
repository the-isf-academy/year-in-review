require('dotenv').config()

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


const auth = createOAuthAppAuth({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
});

// OAuth Apps authenticate using Basic auth, where
// username is clientId and password is clientSecret
const appAuthentication = await auth({
  type: "oauth-app"
});

//receiving oauth token from a post request
//github

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
    // console.log(users);
    return users;
}


async function getAllRepos() {
  var repos = await octokit.paginate(octokit.repos.listForOrg, {
    org: "the-isf-academy",
    type: "all"
  });
  return repos;
}

async function getFirst30Repos() {
  var repos = await octokit.repos.listForOrg ({
    org: "the-isf-academy",
    type: "all"
  });
  return repos.data;
}


async function checkContributor(repoName, student){
  let response = await octokit.repos.listContributors({
    owner: "the-isf-academy",
    repo: repoName,
  })
  let contributors = response.data;
  for (var i = 0; i < contributors.length; i++){
    if (contributors[i].login == student){
      return true;
    }
  }
  return false;
}


/* Looks through repos (either the first 30 repos or all the repos) and
* returns an array of all the repos the student has contributed to.
*/
async function getStudentRepos(student) {
  var studentrepos = [];
  //use either getAllRepos or getFirst30Repos
  var repos = await getFirst30Repos();

  for (var i = 0; i < repos.length; i++){
    currRepo = repos[i];
    console.log(currRepo.description);
    var isContributor = await checkContributor(currRepo.name, student);
    if (isContributor){
      studentrepos.push(currRepo);
    }
  }
  console.log(studentrepos.length);
  return studentrepos;
}


var repos = getStudentRepos("wolfj95")
  .catch(e => {
    console.log( "something went wronnnng");
  });

// var users = console.log(getUsers());
