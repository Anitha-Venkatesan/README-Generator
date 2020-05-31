let inquirer = require("inquirer");
let lodash = require('lodash');
const axios = require("axios");
const markdown =require('./utils/generateMarkdown');
const apis = require('./utils/axiosGitHubApi');

//inquirer to get command line input
inquirer
  .prompt([
    {
      message: "Generating README using Command Line Interface",
      name:"readme"
    },
    {
      message: "Enter your GitHub Username?",
      name: "gitHubUsername",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Github username is required.";
        }
        return true;
      }
    },
    {
      message: "Enter your GitHub Email?",
      name: "GitHubEmail",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Github email is required.";
        }
        return true;
      }
    },
    {
      message: "Enter your GitHub Repository name?",
      name: "gitHubRepoName",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Github Repository name  is required.";
        }
        return true;
      }
    },
    {
      message: "What is the title of the project?",
      name: "title",
      default :"Project title"
      
    },
    {
        message: "Write Description about the project?",
        name: "description",
        default :"Project description"
        
    },   
    {
        message: "What command should be used to install npm packages ?",
        name: "installation",
        default : "npm i"
    },
    {
        type: "input",
        message: "What is the command to run the application?",
        name: "usage",
    },
    {
      type: "input",
      message: "What command should be used to run the tests?",
      name: "tests",
      default:"npm run test"
    },
    {
      type: 'list',
      message: "What is the license used in this project?",
      name: "license",
      choices: ['MIT', 'BSL','GPL'],
    } 
           
  ]).then(async function(data) {
    try{
      const profile = await apis.getGitHubProfile(data.gitHubUsername);
      const repo = await apis.getGitHubRepo(data.gitHubUsername,data.gitHubRepoName);
      markdown.generateMarkdown(data, profile, repo); 
      
    }
    catch(err) {
      console.log(err);
    }
    
   
});
  
