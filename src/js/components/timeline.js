import React, { Component } from "react";

;'use strict';

function TimelineMonth(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <div className="timeline-month ml-3 p-4">
            <h3>{monthNames[props.date]}</h3>
        </div>
    );
}

function TimelineItem(props) {
    return (
        <li className="timeline-item bg-white rounded ml-3 p-4 shadow">
            <div className="timeline-arrow"></div>
            <h2 className="repo-name h5 mb-0">{props.repo.name}</h2><span className="small text-gray"><i className="fa fa-clock-o mr-1"></i><p className="repo-creation-date">created {props.repo.date.toString()}</p></span>
            <p className="repo-description text-small mt-2 font-weight-light">lab-uno-Haji42069 created by GitHub Classroom</p>
            <div className="container repo-buttons">
                <div className="row align-items-center">
                    <div className="col-lg mx-auto">
                        <a className="repo-link btn btn-outline-primary" href="https://www.github.com" role="button" target="_blank" rel="noopener noreferrer">Github Repository</a>
                    </div>
                    <div className="col-lg mx-auto">
                        <a className="assign-link btn btn-outline-primary" href="#" role="button"  target="_blank" rel="noopener noreferrer">Assignment Page</a>
                    </div>
                </div>
            </div>
        </li>
    );
}

function Timeline(props) {
    var reposByMonth = {}
    for (const repo of props.repos) {
        var month = repo.date.getMonth();
        if (reposByMonth[month]) {
            reposByMonth[month].push(repo);
        } else {
            reposByMonth[month] = [repo];
        }
    }

    return (
        <ul className="timeline">
            {Object.entries(reposByMonth).map((monthOfRepos, index) => {
                return (
                    <div key={index} className="timeline-month-container">
                        <TimelineMonth date={monthOfRepos[0]}/>
                        {monthOfRepos[1].map((repo, index) => {
                            return (
                                <TimelineItem key={index} repo={repo}/>
                        )
                    })}
                    </div>
                );
            })}
        </ul>
    );
}

export default Timeline;

