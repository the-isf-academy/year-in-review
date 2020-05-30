import 'bootstrap'
import logMessage from './js/logger'
import './scss/custom.scss'
import React from "react";
import ReactDOM from "react-dom"
import Timeline from './js/components/timeline'

import './server/firebase.js'
import './js/welcome.js'
import './js/database.js'
// Log message to console
logMessage('Welcome to Year in Review!')

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
const domContainer = document.querySelector('#timeline-container');
if (domContainer) {
    ReactDOM.render(<Timeline repos={repos}/>, domContainer);
}
