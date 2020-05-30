let inquirer = require("inquirer");
let fs = require("fs");
let lodash = require('lodash');
const axios = require("axios");

inquirer
  .prompt([
    {
      message: "Enter your GitHub Username?",
      name: "GitHubUsername",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Github username is required.";
        }
        return true;
      }
    },
    {
      message: "Enter your Email id?",
      name: "Emailid",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Email id is required.";
        }
        return true;
      }
    },
    {
      message: "Enter your GitHub Repository name?",
      name: "GitHubRepoName",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Github Repository name  is required.";
        }
        return true;
      }
    },
    {
      message: "what is the GitHub url to your project?",
      name: "url",
      default :"GitHub Url"
      
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
        message: "What should the user needs to know about the project?",
        name: "usage",
    },
    {
      type: "input",
      message: "What command should be used to run the tests?",
      name: "tests",
      default:"npm run test"
    }          
  ]).then(function(data) {
  const readMeDetails = `
# ${data.title}
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
[![npm version](https://badge.fury.io/js/cli.svg)](https://badge.fury.io/js/cli)
[![npm version](https://badge.fury.io/js/lodash.svg)](https://badge.fury.io/js/lodash)
## Description
* ${data.description}
## Table of Contents 
    \n 1. [Installation](#installation)
    \n 2. [Usage](#usage)
    \n 3. [Contributing](#contributing)
    \n 4. [License](#license)
    \n 5. [Tests](#tests)
    \n 6. [Questions](#questions)
### Installation
* \`${data.installation}\` \n
### Usage
* ${data.usage} \n
### Contributing \n
* Fork the repository,
* Clone the repository using git clone, 
* Implement your code,
* Create a Pull Request, 
* Once approved, it will merge to master.
### Tests 
* \`${data.tests}\` \n
`; 
  fs.writeFileSync("utils/README.md", readMeDetails, function(err) {
    if (err) {
      return console.log(err);
    }
  }); 
 return inquirer.prompt([{
    type: 'list',
    message: "What is the license used in this project?",
    name: "license",
    choices: ['MIT', 'BSL','GPL'],
  }]);  
  }).then((licenseData)=>{
  let licenseContent = `[${licenseData.license}]`;
  if (licenseContent === 'MIT') {
    licenseContent += '(https://choosealicense.com/licenses/mit/)';
  } else if (licenseContent === 'BSL'){
    licenseContent += '(https://choosealicense.com/licenses/bsl-1.0/)';
  } else if(licenseContent === 'GPL') {
    licenseContent += '(https://choosealicense.com/licenses/gpl-3.0/)';
  }else {
    licenseContent += '(https://choosealicense.com/licenses/mit/)';
  }
  const content = [ 
    '### License',
    '* This program is licensed under the ' +licenseContent +' license.' 
  ];
  fs.appendFile("utils/README.md", content.join('\n'), function(err) {
    if (err) { 
      return console.log(err);
    }
  });
  });
  
    

  '### Questions',
    'If you have any questions,Please contact me'+gitHubUsername ,
     'to my email'+email 
  
