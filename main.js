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
