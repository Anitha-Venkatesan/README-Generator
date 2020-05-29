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
        name: "contibutor"
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

## ${data.title}
## Description
* ${data.description}
## Table of Contents 
  [Installation](Installation)<br>
  [Usage](Usage)<br>
  [License](License)<br>
  [Contributor](Contributor)<br>
  [Tests](Tests)<br>
  [Questions](Questions)<br>
### Installation
* ${data.installation}
### Usage
* ${data.usage}
### License
* ${data.license}
### Contributor
* ${data.contibutor}
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

  const questions = () => {
    inquirer
      .prompt([{
        type: 'list',
        name: 'options',
        message: 'Welcome to README Generator',
        choices: ['GitHubUsername', 'GitHubRepoName', 'title', 'description', 'installation', 'usage','license','contibutor','tests','profile','email']
      }]).then(questions => {
        let currentQuestion = Object.keys(values)[0];
        switch (values.options) {
          case 'GitHubUsername':
            GitHubUsername.getGitHubUsername(currentQuestion);
          case 'GitHubRepoName':
            GitHubRepoName.getGitHubRepoName(currentQuestion);
          case 'title':
            title.getTitle(currentQuestion);
          case 'description':
            description.getDescription(currentQuestion);
          case 'usage':
            usage.getUsage(currentQuestion);
          case 'license':
            license.getLicense(currentQuestion);
          case 'contibutor':
              contibutor.getContibutor(currentQuestion);
          case 'tests':
              tests.getTests(currentQuestion);
          case 'profile':
            profile.getProfile(currentQuestion);
          case 'email':
            email.getEmail(currentQuestion);
            break;
        }
      });

      function getGitHubUsername(name) {

        if(data.GitHubUsername === "") {
          inquirer
          .prompt([
              {
              message: "Enter your GitHub Username?",
              name: "GitHubUsername"
              }]);
          console.log("username");
        }
      }
  }; 

  