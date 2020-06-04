import 'bootstrap';
// import './scss/custom.scss';
// We can get the token from the "access_token" query
// param, available in the browsers "location" global
const page = window.location.pathname;
const query = window.location.search.substring(1);
const token = query.split('access_token=')[1];

import { Octokit } from '@octokit/rest';
import { graphql } from "@octokit/graphql";
import { createTokenAuth } from "@octokit/auth-token";
// Required for side-effects
import Fire from './Fire';
import React from "react";
import ReactDOM from "react-dom";
import ContribStats from './components/contribStats';
import Timeline from './components/timeline';
import PromptCard from './components/prompts';


let EMAIL = "";
let USER = "";
let year = "2019-2020";
let unit = "EndofYear";
let NAME = "";

function loadPageContent() {
    const auth = createTokenAuth(token);
    auth()
        .then( res => {
            const graphqlWithAuth = graphql.defaults({
                request: {
                    hook: auth.hook,
                },
            });
            graphqlWithAuth(
                {
                    query: `query commitCount($login: String!) {
                        user(login:$login) {
                            name
                            repositories(last: 100, orderBy: {field:CREATED_AT, direction:ASC}) {
                                pageInfo {hasNextPage, endCursor}
                                nodes {
                                    name
                                    createdAt
                                    url
                                    description
                                }
                            }
                            contributionsCollection {
                                contributionCalendar {
                                    totalContributions
                                }
                            }
                        }
                    }`,
                    login: USER,
                }
            )
                .then( res => {
                    const totalCommits = res.user.contributionsCollection.contributionCalendar.totalContributions;
                    const totalRepos = res.user.repositories.nodes.length;
                    const repos = res.user.repositories.nodes
                    loadTopContent(totalCommits, totalRepos);
                    loadTimelineContent(repos);
                    loadPromptCardContent();
                });
        });
}

function loadTopContent(numCommits, numRepos) {
    const welcomeHeader = document.getElementById("student-welcome");
    if (NAME) {
        welcomeHeader.textContent = "👾 Welcome, " + NAME + ".";
    }
    const contribStatsContainer = document.querySelector('#contrib-stats-container');
    ReactDOM.render(<ContribStats numRepos={numRepos} numCommits={numCommits}/>, contribStatsContainer);
}

function loadTimelineContent(repos) {
    const timelineDomContainer = document.querySelector('#timeline-container');
    if (timelineDomContainer) {
        ReactDOM.render(<Timeline repos={repos} user={USER}/>, timelineDomContainer);
    }
}

async function loadPromptCardContent() {
  var formPages = await Fire.getFormPage(year, unit);
  const promptsDomContainer = document.querySelector('#prompt-cards-container');
    if (promptsDomContainer) {
        ReactDOM.render(<PromptCard formPages={formPages} />, promptsDomContainer);
    }
}


// Call the user info API using the fetch browser library

if (page == '/welcome.html') {
    const octokit = new Octokit({
        auth: token
    })
    octokit.request("/user")
        .then(res => {
            // Once we get the response (which has many fields)
            // Documented here: https://developer.github.com/v3/users/#get-the-authenticated-user
            // Write "Welcome <user name>" to the documents body
            EMAIL = res.data.email;
            USER = res.data.login;
            NAME = res.data.name;
            const profileImg = document.getElementById("profile-img");
            profileImg.style.setProperty("background-image", "url("+res.data.avatar_url+")");
            Fire.storeUser(res);
            loadPageContent();
        })
}
