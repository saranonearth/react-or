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