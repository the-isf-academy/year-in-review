import React, { Component } from "react";

;'use strict';

function ContribStats(props) {
    return (
        <div className="contrib-stats-container">
            <h2> In the past year, </h2>
            <h2> you contributed to {props.numRepos} repositories </h2>
            <h2> with {props.numCommits} contributions. </h2>
        </div>
    )
}

export default ContribStats;

