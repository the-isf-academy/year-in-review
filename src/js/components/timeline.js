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
    let date = new Date(props.repo.created_at);
    return (
        <li className="timeline-item bg-white rounded ml-3 p-4 shadow">
            <div className="timeline-arrow"></div>
            <h2 className="repo-name h5 mb-0">{props.repo.name}</h2><span className="small text-gray"><i className="fa fa-clock-o mr-1"></i><p className="repo-creation-date">created {date.toDateString()}</p></span>
            <p className="repo-description text-small mt-2 font-weight-light">{props.repo.description}</p>
            <div className="container repo-buttons">
                <div className="row align-items-center">
                    <div className="col-lg mx-auto">
                        <a className="repo-link btn btn-outline-primary" href={props.repo.svn_url} role="button" target="_blank" rel="noopener noreferrer">Github Repository</a>
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
    var reposByMonthYear = {}
    for (const repo of props.repos) {
        let date = new Date(repo.created_at);
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
                                    console.log(repo);
                                    return (
                                        <TimelineItem key={index} repo={repo}/>
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

