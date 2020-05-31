import 'bootstrap';
// import './scss/custom.scss';
// We can get the token from the "access_token" query
// param, available in the browsers "location" global
const query = window.location.search.substring(1)
const token = query.split('access_token=')[1]

import { Octokit } from '@octokit/rest';
// Required for side-effects
import {storeUser, display} from './database';
import React from "react";
import ReactDOM from "react-dom"
import Timeline from './components/timeline'
import PromptCard from './components/prompts'


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
        const welcomeHeader = document.getElementById("student-welcome")
        if (res.data.name) {
            welcomeHeader.textContent = "👾 Welcome, " + res.data.name;
        }
        storeUser(res);
        display(res.data.login);
    })

octokit.repos.listForAuthenticatedUser({
})
    .then(res => {
        // Listing out the user's repositories
        console.log(res.data)
        res.data.forEach(value => {
            const reposList = document.getElementById("repos-list")
            const li = document.createElement("li")
            const repoName = document.createTextNode(`\n${value.name}`)
            //li.appendChild(repoName)
            //reposList.appendChild(li)
        })
    })
var repo0 = {
    name: "project-data-science",
    date: new Date('21 February, 2019')
};
var repo1 = {
    name: "lab-uno",
    date: new Date('21 March, 2019')
};
var repo2 = {
    name: "lab-bank",
    date: new Date('11 March, 2019')
};
var repos = [repo0, repo1, repo2];

const timelineDomContainer = document.querySelector('#timeline-container');
if (timelineDomContainer) {
    ReactDOM.render(<Timeline repos={repos}/>, timelineDomContainer);
}
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
        criterion: "Knowing, understanding, and computational thinking",
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

const promptsDomContainer = document.querySelector('#prompt-cards-container');
if (promptsDomContainer) {
    ReactDOM.render(<PromptCard formPages={formPages} />, promptsDomContainer);
}
