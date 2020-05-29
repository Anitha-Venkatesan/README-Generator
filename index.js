let inquirer = require("inquirer");
let fs = require("fs");
let lodash = require('lodash');

function getInstallationSteps(numberOfInstallationSteps) {
  const ranges = lodash.range(Number(numberOfInstallationSteps));
  const installationPrompts = ranges.map((range) => {
    return {
      message: `Enter step number ${range + 1} of installation`,
      name: `installationStep${range + 1}`,
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return `Please enter installation step ${range + 1}`;
        }
        return true;
      }
    };
  });
  return inquirer.prompt(installationPrompts);
}

function getExecutionSteps(numberOfExecutionSteps) {
  const ranges = lodash.range(Number(numberOfExecutionSteps));
  const executionPrompts = ranges.map((range) => {
    return {
      message: `Enter step number ${range + 1} of Execution`,
      name: `executionStep${range + 1}`,
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return `Please enter Execution step ${range + 1}`;
        }
        return true;
      }
    };
  });
  return inquirer.prompt(executionPrompts);
}

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
      message: "Enter your GitHub Repository name?",
      name: "GitHubRepoName",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Github username is required.";
        }
        return true;
      }
    },
    {
      message: "What is the title of the project?",
      name: "title",
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return "Title is required.";
        }
        return true;
      }
    },
    {
        message: "Write Description about the project?",
        name: "description",
        validate: (input) => {
          if (lodash.isEmpty(input)) {
            return "Description is required.";
          }
          return true;
        }
    },
    {
        message: "How many steps in installation?",
        name: "installation",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please enter number as input.";
          }
          return true;
        }
    }
  ]).then(function(data) {
  const readMeDetails = `
${data.title}
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
`; 

  fs.writeFileSync("utils/README.md", readMeDetails, function(err) {
    if (err) {
      return console.log(err);
    }
  }); 

  return getInstallationSteps(data.installation);
}).then((dataInstallationSteps) => {
   let readMeInstallationSteps = "";
   for (const finalSteps in dataInstallationSteps) {
    readMeInstallationSteps += "* ";
    readMeInstallationSteps += dataInstallationSteps[finalSteps]; 
    readMeInstallationSteps += "\n";
  }
   //console.log(`${finalSteps}: ${dataSteps[finalSteps]}`);
  fs.appendFile("utils/README.md", readMeInstallationSteps +"\n", function(err) {
    if (err) { 
      return console.log(err);
    }
  }); 

  return inquirer
    .prompt([
      {
          message: "How many steps to execute the application?",
          name: "usage",
          validate: (input) => {
            if (lodash.isEmpty(input)) {
              return "Please Enter steps to run the application.";
            }
            return true;
          },
          validate: (input) => {
            if (isNaN(input)) {
              return "Please enter number as input.";
            }
            return true;
          }
      }
    ]);
}).then((numberOfExecutionSteps) => {
  return getExecutionSteps(numberOfExecutionSteps.usage);
}).then((dataExecutionSteps) => {
  console.log(dataExecutionSteps);  
  
  let readMeExecutionSteps = '### Usage'+"\n"+ "";
  for (const finalSteps in dataExecutionSteps) {
    readMeExecutionSteps += "* ";
    readMeExecutionSteps += dataExecutionSteps[finalSteps]; 
    readMeExecutionSteps += "\n";
    
 }
  //console.log(`${finalSteps}: ${dataSteps[finalSteps]}`);
 fs.appendFile("utils/README.md", readMeExecutionSteps +"\n", function(err) {
   if (err) { 
     return console.log(err);
   }
 }); 
});


  

      
  

  