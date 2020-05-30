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
function getTestSteps(numberOfTestSteps) {
  const ranges = lodash.range(Number(numberOfTestSteps));
  const testPrompts = ranges.map((range) => {
    return {
      message: `Enter step number ${range + 1} of Tests`,
      name: `testSteps${range + 1}`,
      validate: (input) => {
        if (lodash.isEmpty(input)) {
          return `Please enter test step ${range + 1}`;
        }
        return true;
      }
    };
  });
  return inquirer.prompt(testPrompts);
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
          if (isNaN(input) || lodash.isEmpty(input)) {
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
    readMeInstallationSteps += "`"+dataInstallationSteps[finalSteps]+"`"; 
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
            if (isNaN(input) || lodash.isEmpty(input)) {
              return "Please enter number as input.";
            }
            return true;
          }
      }
    ]);
}).then((data) => {
  return getExecutionSteps(data.usage);
}).then((dataExecutionSteps) => {
  let readMeExecutionSteps = '### Usage'+"\n"+ "";
  for (const finalSteps in dataExecutionSteps) {
    readMeExecutionSteps += "* ";
    readMeExecutionSteps += dataExecutionSteps[finalSteps]; 
    readMeExecutionSteps += "\n";
    
 }
 fs.appendFile("utils/README.md", readMeExecutionSteps +"\n", function(err) {
   if (err) { 
     return console.log(err);
   }
 }); 
 return inquirer.prompt([{
    type: 'list',
    message: "What is the License name?",
    name: "license",
    choices: ['MIT', 'BSD','GPL'],
    validate: (input) => {
      if (isNaN(input) || lodash.isEmpty(input)) {
        return "Please enter number as input.";
      }
      return true;
    }  
  }]);
}).then((licenseData)=>{
  const content = [
    '### License',
    licenseData.license,
    '### Contributing',
    '* Fork the Repository',
    '* Clone the repository using git clone', 
    '* Implement your code',
    '* Create a PR', 
    '* Onece approved,it will merge to master'
  ];

  fs.appendFile("utils/README.md", content.join('\n'), function(err) {
    if (err) { 
      return console.log(err);
    }
  });
  return inquirer
    .prompt([
      {
          message: "How many steps for the Tests?",
          name: "tests",
          validate: (input) => {
            if (isNaN(input) || lodash.isEmpty(input)) {
              return "Please enter number as input.";
            }
            return true;
          }
      }
    ]);
}).then((dataTestSteps) => {
  return getTestSteps(dataTestSteps.tests);
}).then((dataTestSteps) => {
  let readMeTestSteps = "\n"+'### Tests'+"\n"+ "";
  for (const finalSteps in dataTestSteps) {
    readMeTestSteps += "* ";
    readMeTestSteps += dataTestSteps[finalSteps]; 
    readMeTestSteps += "\n";
    
 }
 fs.appendFile("utils/README.md", readMeTestSteps +"\n", function(err) {
  if (err) { 
    return console.log(err);
  }
}); 
});