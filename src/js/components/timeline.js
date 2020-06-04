import React, { Component } from "react";

;'use strict';

function TimelineMonth(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <div className="timeline-month ml-3 p-4">
            <h3>{monthNames[props.month]+" "+props.year}</h3>
        </div>
    );
}

function TimelineItem(props) {
    let date = new Date(props.repo.createdAt);
    const assignLinks = {
        "project-game-": "https://cs.fablearn.org/projects/2-game%20project.html",
        "quest": "https://cs.fablearn.org/labs/2-6-feature%20lab.html",
        "data-science-projecti-": "https://cs.fablearn.org/projects/1-data%20science%20research%20project.html",
        "lab-uno-": "https://cs.fablearn.org/labs/2-2-uno%20lab.html",
        "lab-bank-": "https://cs.fablearn.org/labs/2-0-bank%20lab.html",
        "lab-01-summary-statistics-": "https://cs.fablearn.org/labs/1-4-summary%20statistics%20lab.html",
        "lab-min-loss-": "https://cs.fablearn.org/labs/1-7-minimizing%20loss%20lab.html",
        "hw-01-06-": "https://cs.fablearn.org/homework/1-6-homework%201.6:%20practice%20working%20with%20lines.html",
        "lab-summary-lines-": "https://cs.fablearn.org/labs/1-6-summary%20lines%20lab.html",
        "hw-01-07-": "https://cs.fablearn.org/homework/1-7-homework%201.7:%20random%20numbers%20and%20searching.html",
        "lab-box-and-whisker-plot-": "https://cs.fablearn.org/labs/1-3-box%20and%20whisker%20plot%20lab.html",
        "homeowrk-1-2-more-functional-programming-": "https://cs.fablearn.org/homework/1-2-homework%201.2:%20more%20functional%20programming.html",
        "homework-1-1-functional-programming-": "https://cs.fablearn.org/homework/1-1-homework%201.1:%20functional%20programming.html",
        "lab-scatter-plot-": "https://cs.fablearn.org/labs/1-2-scatter%20plot%20lab.html",
        "unit-0-drawing-": "https://cs.fablearn.org/projects/0-drawing%20project.html",
        "lab-types-": "https://cs.fablearn.org/labs/1-1-types%20lab.html",
        "lab-functional-programming-": "https://cs.fablearn.org/labs/1-0-functional%20programming%20lab.html",
    }
    const assignName = props.repo.name.replace(props.user, "");
    const assignLink = assignLinks[assignName];

    return (
        <li className="timeline-item bg-white rounded ml-3 p-4 shadow">
            <div className="timeline-arrow"></div>
            <h2 className="repo-name h5 mb-0">{props.repo.name}</h2><span className="small text-gray"><i className="fa fa-clock-o mr-1"></i><p className="repo-creation-date">created {date.toDateString()}</p></span>
            <p className="repo-description text-small mt-2 font-weight-light">{props.repo.description}</p>
            <div className="container repo-buttons">
                <div className="row align-items-center">
                    <div className="col-lg mx-auto">
                        <a className="repo-link btn btn-outline-primary" href={props.repo.url} role="button" target="_blank" rel="noopener noreferrer">Github Repository</a>
                    </div>
                    {assignLink
                        ? <div className="col-lg mx-auto">
                            <a className="assign-link btn btn-outline-primary" href={assignLink} role="button"  target="_blank" rel="noopener noreferrer">Assignment Page</a>
                        </div>
                        : <div> </div>
                    }
                </div>
            </div>
        </li>
    );
}

function Timeline(props) {
    var reposByMonthYear = {}
    for (const repo of props.repos) {
        let date = new Date(repo.createdAt);
        const month = date.getMonth();
        const year = date.getFullYear();
        if (reposByMonthYear[year]) {
            if (reposByMonthYear[year][month]) {
                reposByMonthYear[year][month].push(repo);
            } else {
                reposByMonthYear[year][month] = [repo];
            }
        } else {
            let monthOfRepos = {};
            monthOfRepos[month] = [repo];
            reposByMonthYear[year] = monthOfRepos;
        }
    }

    return (
        <ul className="timeline">
            {Object.entries(reposByMonthYear).map((yearOfRepos, index) => {
                return (
                    Object.entries(yearOfRepos[1]).map((monthOfRepos, index) => {
                        return (
                            <div key={index} className="timeline-month-container">
                                <TimelineMonth year={yearOfRepos[0]} month={monthOfRepos[0]}/>
                                {monthOfRepos[1].map((repo, index) => {
                                    return (
                                        <TimelineItem key={index} repo={repo} user={props.user}/>
                                    )
                                })}
                            </div>
                        );
                    })
                )
            })}
        </ul>
    );
}

export default Timeline;

