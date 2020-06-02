import React, { Component } from "react";
import {storeUser,storeFormInput, getPreviousFormInput, display} from '../database';


;'use strict';

function TextInputQuestion(props) {
    return (
        <div className="form-row m-3">
            <label>
                {props.question.prompt}
            </label>
                <textarea name={props.question.id} value={props.formState.fields[props.question.id]} onChange={props.formHandleChange} className="form-control" aria-describedby={"prompt"+props.index+"Help"} placeholder="What do you think?"/>
                <small id={"prompt"+props.question.id+"Help"} className="form-text text-muted">{props.formState.errors[props.question.id]}</small>
        </div>
    )
}

function DropdownQuestion(props) {
    return (
        <div className="form-row m-3">
            <label>
                {props.question.prompt}
            </label>
                <select name={props.question.id} value={props.formState.fields[props.question.id]} onChange={props.formHandleChange} className="form-control" aria-describedby={"prompt"+props.index+"Help"}>
                    <option value="" disabled hidden>Select an option</option>
                    {props.question.inputOptions.map((option, index) => {
                        return (
                            <option key={index} value={option}>{option}</option>
                        );
                    })}
                </select>
                <small id={"prompt"+props.question.id+"Help"} className="form-text text-muted">{props.formState.errors[props.question.id]}</small>
        </div>
    )
}

function PromptCardPage(props) {
    return (
        <div className={props.index == 0 ? "carousel-item active" : "carousel-item"}>
            <div className="card bg-primary">
                <div className="card-body">
                    <div className="card-title m-auto p-3 rounded bg-dark text-white">
                        <h4 className="m-0" id="prompt-number"> Prompt {props.index}</h4>
                        <h5 className="m-0" id="criterion">{props.page.criterion}</h5>
                    </div>
                    <div className="prompts">
                        {props.page.questions.map((question, index) => {
                            return (
                                <div key={question.id} className="question">
                                    {question.inputStyle == "textInput"
                                        ? <TextInputQuestion key={index} index={index} question={question}
                                            formState={props.formState} formHandleChange={props.formHandleChange}/>
                                        : <DropdownQuestion key={index} index={index} question={question}
                                            formState={props.formState} formHandleChange={props.formHandleChange}/>
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div className="form-row m-3 justify-content-end">
                        {props.index == props.numPages-1
                            ? <input type="submit" className="btn btn-secondary" value="Submit"/>
                            : <input type="submit" className="btn btn-secondary" href="#carouselExampleIndicators" data-slide="next" value="Next"/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

class PromptCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.formPages = props.formPages;
        let req = {
            collection: "reflections",
            doc: "June2020"
        }
        let res = {};
        getPreviousFormInput(req, res)
            .then(res => {
                console.log(res);
                if (res.fields) {
                    console.log("res has fields");
                    this.state = {
                        fields: res.fields,
                        errors: {}
                    };
                } else {
                    const fields = {}
                    for (const page of props.formPages) {
                        for (const question of page.questions) {
                            fields[question.id] = "";
                        }
                    }
                    this.state = {
                        fields: fields,
                        errors: {}
                    };
                }
            }
        );
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let formIsValid = true;
        let errors = {};
        for (var field of Object.entries(this.state.fields)) {
            if (field[1] == "") {
                formIsValid = false;
                errors[field[0]] = "Cannot be empty";
            }
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(event) {
        let fields = this.state.fields;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        fields[name] = value;
        this.setState({fields: fields});
        console.log("change state of "+name+"to "+value);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            console.log(this.state);
            alert('Are you ready to submit your reflection?');
            storeFormInput(this.state.fields)
        } else {
            console.log(this.state);
            alert("Form has errors.");
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.formPages.map((page, index) => {
                    return (
                        <PromptCardPage key={index} index={index} formState={this.state}
                            formHandleChange={this.handleChange} formHandleSubmit={this.handleSubmit}
                            page={page} numPages={this.formPages.length} />
                    );
                })}
            </form>
        )
    }
}

function PromptCard(props) {
    return (
        <div className="reflection-cards sticky-offset sticky-top">
            <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
                <ol className="carousel-indicators">
                    {props.formPages.map((page, index) => {
                        return (
                            <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index == 0 ? " active" : ""}></li>
                        );
                    })}
                </ol>
                <div className="carousel-inner shadow">
                    <PromptCardForm formPages={props.formPages}/>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

export default PromptCard;
