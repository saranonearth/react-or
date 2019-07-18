const utils = require('./util')
const inquirer = require('inquirer')

exports.getProjectName = () => {
    const question = [{
        name: 'projectName',
        type: 'input',
        message: 'Enter your project name.',
        validate: (value) => {
            if (utils.fileExists(`${value}`)) {
                return 'Project already exist';
            } else {
                return true
            }
        }

    }]
    return inquirer.prompt(question);
}

exports.getCredentials = () => {
    const question = [{
        name: 'username',
        type: 'input',
        message: 'Enter your Github username.',
        validate: (value) => {
            if (value.length !== 0) {
                return true;
            } else {
                return "Username field empty"
            }
        }

    }, {
        name: 'password',
        type: 'password',
        message: 'Enter your Github password.',
        validate: (value) => {
            if (value.length !== 0) {
                return true;
            } else {
                return "password field empty"
            }
        }

    }]
    return inquirer.prompt(question);
}