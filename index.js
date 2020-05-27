let inquirer = require("inquirer");
let fs = require("fs");

inquirer
  .prompt([
    {
      message: "What is your GitHub Username?",
      name: "GitHubUsername"
    },
    {
      message: "What is your GitHub Repository name?",
      name: "GitHubRepoName"
    },
    {
      message: "What is the title of the project?",
      name: "title"
    },
    {
        message: "What is Description about the project?",
        name: "description"
    },
    {
        message: "What is Table of Contents?",
        name: "tableOfContent"
    },
    {
        message: "Installation?",
        name: "installation"
    },
    {
        message: "Usage?",
        name: "usage"
    },
    {
        message: "License?",
        name: "license"
    },
    {
        message: "Contributing?",
        name: "contibuting"
    },
    {
        message: "Tests?",
        name: "tests"
    },
    {
        message: "Get the User GitHub Profile Picture?",
        name: "profile"
    },
    {
        message: "Get the User Email?",
        name: "email"
    }
  ]).then(function(data) {
      const readMeDetails = `
      ${data.GitHubUsername}
      ${data.GitHubRepoName}
      ${data.title}
      ${data.description}
      ${data.tableOfContent}
      ${data.installation}
      ${data.usage}
      ${data.license}
      ${data.contibuting}
      ${data.tests}
      ${data.profile}
      ${data.email}
      `;

      
     fs.writeFile("utils/generateMarkdown.js", readMeDetails, function(err) {
  
        if (err) {
            return console.log(err);
          }
          else console.log("Succesfully Writing into the html file");
    });
    
  }); 
    
