const apis = require('./axiosGitHubApi');
let fs = require("fs");
      
function generateMarkdown(data, profile, repo) {
    let licenseContent = `[${data.license}]`;
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
${content.join('\n')}
### Questions
* If you have any questions, Please feel free to contact me [${profile.name}](${profile.html_url}) on my email ${data.GitHubEmail}\n
* You can also create [issues](${repo.html_url}/issues) on my repo.
\n ![My profile image](${profile.avatar_url}&s=200)
    `;
    fs.writeFileSync("utils/README.md", readMeDetails, function(err) {
        if (err) {
        return console.log(err);
        }
    });
}    
module.exports = {generateMarkdown};
    
            
            
            
            
            
            
            
            
            
            
      