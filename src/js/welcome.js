import 'bootstrap';
// import './scss/custom.scss';
// We can get the token from the "access_token" query
// param, available in the browsers "location" global
const query = window.location.search.substring(1)
const token = query.split('access_token=')[1]

import { Octokit } from '@octokit/rest';
import { graphql } from "@octokit/graphql";
import { createTokenAuth } from "@octokit/auth-token";
// Required for side-effects
import {storeUser, display} from './database';
import React from "react";
import ReactDOM from "react-dom";
import ContribStats from './components/contribStats';
import Timeline from './components/timeline';
import PromptCard from './components/prompts';

let EMAIL = "";
let USER = "";
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
                    console.log(res);
                    const totalCommits = res.user.contributionsCollection.contributionCalendar.totalContributions;
                    const totalRepos = res.user.repositories.nodes.length;
                    const repos = res.user.repositories.nodes
                    loadTopContent(totalCommits, totalRepos);
                    loadTimelineContent(repos);
                    loadPromptCardContent(formPages);
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
        ReactDOM.render(<Timeline repos={repos}/>, timelineDomContainer);
    }
}

function loadPromptCardContent(form) {
    const promptsDomContainer = document.querySelector('#prompt-cards-container');
    if (promptsDomContainer) {
        ReactDOM.render(<PromptCard formPages={form} />, promptsDomContainer);
    }
}

// Call the user info API using the fetch browser library

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
        storeUser(res);
        display(res.data.login);
        loadPageContent();
    })


var formPages = [
    {
        id: "G0",
        criterion: "General",
        questions: [
            {
                id: "G0.0",
                prompt: "What is your name?",
                inputStyle: "textInput",
            },
            {
                id: "G0.1",
                prompt: "How old are you?",
                inputStyle: "dropdown",
                inputOptions: [1, 2, 3, 4],
            }
        ]
    },
    {
        id: "A0",
        criterion: "Computational thinking",
        questions: [
            {
                id: "A0.0",
                prompt: "Here’s a list of concepts we covered this year. Choose a concept that you think is really beautiful or interesting.",
                inputStyle: "dropdown",
                inputOptions: ["Functions", "Lists", "Loops"]
            },
            {
                id: "A0.1",
                prompt: "Select a project that you think showcases the beauty of this concept.",
                inputStyle: "dropdown",
                inputOptions: ["Lab1", "lab2", "Lab3"]
            },
            {
                id: "A0.2",
                prompt: "Describe why you think this project shows the beauty of this concept.",
                inputStyle: "textInput",
            }
        ]
    },
]    

