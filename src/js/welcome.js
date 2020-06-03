import 'bootstrap';
// import './scss/custom.scss';
// We can get the token from the "access_token" query
// param, available in the browsers "location" global
const query = window.location.search.substring(1)
const token = query.split('access_token=')[1]

import { Octokit } from '@octokit/rest';
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
let unit = "Test";

// Call the user info API using the fetch browser library
const octokit = new Octokit({
    auth: token
})
octokit.request("/user")
    .then(res => {
        // Once we get the response (which has many fields)
        // Documented here: https://developer.github.com/v3/users/#get-the-authenticated-user
        // Write "Welcome <user name>" to the documents body
        console.log(res.data)
        EMAIL = res.data.email;
        USER = res.data.login;
        console.log(res.data.avatar_url);
        const profileImg = document.getElementById("profile-img");
        console.log(profileImg);
        profileImg.style.setProperty("background-image", "url("+res.data.avatar_url+")");
        const welcomeHeader = document.getElementById("student-welcome")
        if (res.data.name) {
            welcomeHeader.textContent = "👾 Welcome, " + res.data.name + ".";
        }
        Fire.storeUser(res);
        let commitsCount = 0;
        let reposContrib = new Set();
        console.log("email: ", EMAIL);
        console.log("user: ", USER);
        octokit.paginate(octokit.repos.listForAuthenticatedUser, {
        })
            .then(res => {
                // Listing out the user's repositories
                console.log(res)
                const timelineDomContainer = document.querySelector('#timeline-container');
                if (timelineDomContainer) {
                    ReactDOM.render(<Timeline repos={res}/>, timelineDomContainer);
                }

        });
        octokit.paginate(octokit.activity.listEventsForAuthenticatedUser,
            {
                username: USER
            })
            .then(events => {
                console.log(events);
                events.some( event => {
                    if (event.type === 'PushEvent') {
                        event.payload.commits.some(commit => {
                            if (commit.author.email === EMAIL) {
                                commitsCount += 1;
                            }
                        });
                    }
                    reposContrib.add(event.repo.name);
                });
                console.log(reposContrib.size);
                console.log(commitsCount);
                const contribStatsContainer = document.querySelector('#contrib-stats-container');
                ReactDOM.render(<ContribStats numRepos={reposContrib.size} numCommits={commitsCount}/>, contribStatsContainer);
            });
        Fire.storeUser(res);
    });

//get the right formPages from Firebase
(async() => {
  var formPages = await Fire.getFormPage(year, unit);
  console.log(formPages);
  const promptsDomContainer = document.querySelector('#prompt-cards-container');
    if (promptsDomContainer) {
        ReactDOM.render(<PromptCard formPages={formPages} />, promptsDomContainer);
    }
})();
