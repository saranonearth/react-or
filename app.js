const figlet = require('figlet')
const chalk = require('chalk')
const utils = require('./utils/util');
const getDetails = require('./utils/getdetails');
const exec = require('child_process').exec;

console.log(
    chalk.magenta(figlet.textSync('React-or', {
        horizontalLayout: 'full'
    }))
)

const run = async () => {
    const projectName = await getDetails.getProjectName()
    console.log(projectName)

    await utils.createReactApp(projectName)

}
run();