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
# ${data.title}
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
## Description
* ${data.description}
## Table of Contents 
  [Installation](#installation)<br>
  [Usage](#usage)<br>
  [License](#license)<br>
  [Contributing](#contributing)<br>
  [Tests](#tests)<br>
  [Questions](#questions)<br>
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
//Added editor for usage content
  return inquirer
    .prompt([
      {
          type: "editor",
          message: "Type your usage content in the editor",
          name: "usage",
      }
    ]);
}).then((dataUsage) => {
  let usage = "### Usage" + "\n" +"* " +dataUsage.usage;
 fs.appendFile("utils/README.md", usage +"\n", function(err) {
   if (err) { 
     return console.log(err);
   }
 }); 
 return inquirer.prompt([{
    type: 'list',
    message: "What is the License name?",
    name: "license",
    choices: ['MIT', 'BSL','GPL'],
    validate: (input) => {
      if (isNaN(input) || lodash.isEmpty(input)) {
        return "Please enter number as input.";
      }
      return true;
    }  
  }]);
}).then((licenseData)=>{
  let licenseContent = `[${licenseData.license}]`;
  if (licenseContent === 'MIT') {
    licenseContent += '(https://choosealicense.com/licenses/mit/)';
  } else if (licenseContent === 'BSD'){
    licenseContent += '(https://choosealicense.com/licenses/bsl-1.0/)';
  } else {
    licenseContent += '(https://choosealicense.com/licenses/gpl-3.0/)';
  }

  const content = [
    '### License',
    '* ' +licenseContent,
    '### Contributing',
    '* Fork the repository',
    '* Clone the repository using git clone', 
    '* Implement your code',
    '* Create a PR', 
    '* Once approved, it will merge to master'
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
return inquirer
    .prompt([
      {
          type:"list",
          message: "Any other Questions?",
          name: "questions",
          choices :["What is your gitHub Profile Picture?","What is your gitHub Email?"],
          validate: (input) => {
            if (isNaN(input) || lodash.isEmpty(input)) {
              return "Please enter number as input.";
            }
            return true;
          }
      }
    ]);



});