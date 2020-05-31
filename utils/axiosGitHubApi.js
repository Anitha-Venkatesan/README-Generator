

const axios = require('axios');
const baseUrl = 'https://api.github.com/users';
const repourl ='https://api.github.com/repos';

//axios call to get the GitHub username and repository name
async function getGitHubProfile(githubUserName) {
    const queryUrl = `${baseUrl}/${githubUserName}`;
    try {
        const response = await axios.get(queryUrl);
        return response.data;
    }
    catch (err) {
      console.log(err);
    }
}
async function getGitHubRepo(githubUserName,gitHubRepoName) {
    const queryUrl = `${repourl}/${githubUserName}/${gitHubRepoName}`;
    try {
        const response = await axios.get(queryUrl);
        return response.data;

    }
    catch (err) {
      console.log(err);
    }
}
module.exports = { 
    getGitHubProfile,
    getGitHubRepo
};