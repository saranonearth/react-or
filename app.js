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
        var token = utils.getToken();
        console.log('in app.js', token);

        if (!token) {

            console.log(chalk.yellow('Enter your github credentials'))
            //if not present get cred
            token = await utils.registerToken(projectName);
            console.log(token);
        }

        // //create react app
        await utils.createReactApp(projectName)

        let url = await utils.createRepo(token, projectName)
        console.log(url)
        //git add commit push
        let done = utils.localRepo(url);

        if (done) {
            console.log('You are lucky')
        }


        //open vs code
    } catch (error) {
        console.log(error)
    }

}
run();