let inquirer = require("inquirer");
let fs = require("fs");

inquirer
  .prompt([
    {
      message: "Enter your GitHub Username?",
      name: "GitHubUsername"
    },
    {
      message: "Enter your GitHub Repository name?",
      name: "GitHubRepoName"
    },
    {
      message: "What is the title of the project?",
      name: "title"
    },
    {
        message: "Write Description about the project?",
        name: "description"
    },
    {
        message: "How many steps in Installation?",
        name: "installation",
    },
    {
        message: "How to execute the application?",
        name: "usage"
    },
    {
        message: "What is the License name?",
        name: "license"
    },
    {
        message: "How many contributors in this project?",
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
## ${data.GitHubUsername}
## ${data.GitHubRepoName}
## ${data.title}
## Description
* ${data.description}
## Table of Contents 
    [Installation](Installation)
    [Usage](Usage)
    [License](License)
    [Contributor](Contributor)
   [Tests](Tests)
    [Questions](Questions)   
### Installation
* ${installation()}
### Usage
* ${data.usage}
### License
* ${data.license}
### Contributor
* ${data.contibuting}
### Tests
* ${data.tests}
### Questions
* ${data.profile}
* ${data.email}
            `;

      
     fs.writeFile("utils/README.md", readMeDetails, function(err) {
  
        if (err) {
            return console.log(err);
          }
          else console.log("Succesfully Writing into the html file");
    }); 
    
    async function installation()
    {
      let stepLimit = data.installation
    if(!Number(stepLimit))
      {
        return;
      }
    else {
        for(let i=1;i<= stepLimit;i++)
        {
          console.log("Enter the installation steps one by one?")
        }
       }
    } 
  }); 

  