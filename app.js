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
    try {
        const projectName = await getDetails.getProjectName()
        console.log(projectName)

        //check for github cred
        const token = utils.getToken()
        if (!token) {
            console.log(chalk.yellow('Enter your github credentials'))


            await utils.registerToken();

            //if not present get cred
        }

        await utils.createReactApp(projectName)



        // create a repo
        //git add commit push
        //open vs code
    } catch (error) {
        console.log(error)
    }

}
run();