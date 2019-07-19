const fs = require('fs');
const exec = require('child_process').exec;
const CLI = require('clui'),
    Spinner = CLI.Spinner;
const Configstore = require('configstore');
const getDetails = require('./getdetails');
const packageJson = require('../package.json')
const config = new Configstore(packageJson);
const Octokit = require('@octokit/rest');
const chalk = require('chalk');
const git = require('simple-git');

exports.currentPath = () => {
    return process.cwd();
};

exports.fileExists = project => {
    if (fs.existsSync(`${process.cwd()}/${project}`)) {
        return true;
    } else {
        return false;
    }
};

exports.createReactApp = async Name => {
    const spinning = new Spinner('Creating React Project', [
        '⣾',
        '⣽',
        '⣻',
        '⢿',
        '⡿',
        '⣟',
        '⣯',
        '⣷'
    ]);
    spinning.start();

    try {
        await exec(`node --version`, async (err, stdout, stderr) => {
            if (err) return 'Something went wrong';

            spinning.stop();
            console.log('Finished creating React-App');
            await fs.mkdir(`${Name.projectName}`, async () => {
                process.chdir(Name.projectName);
                await fs.writeFileSync('text.js');
                console.log(process.cwd());
            });
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getToken = () => {
    return config.get('GITHUB.tokeN');
};

exports.registerToken = async () => {
    try {
        const Credentials = await getDetails.getCredentials();
        console.log(Credentials);
        const octokit = new Octokit({
            auth: {
                username: Credentials.username,
                password: Credentials.password,
                async on2fa() {
                    return prompt('Two-factor authentication Code:');
                }
            }
        });
        const res = await octokit.oauthAuthorizations.createAuthorization({
            scopes: ['user', 'public_repo', 'repo', 'repo:status'],
            note: 'React-or, Creating Reactjs projects on the go with ease.'
        });

        const token = res.data.token;
        if (token) {
            console.log(chalk.green('Authentication completed'));
            config.set('GITHUB.tokeN', token)
            console.log(config.get('GITHUB.tokeN'))
            return token;
        } else {
            console.log(chalk.red('Auth failed'));
        }
    } catch (error) {
        console.log(error);
    }
};

exports.createRepo = async (token, details) => {
    const {
        description,
        projectName
    } = details;

    try {
        const octokit = await new Octokit({
            auth: token
        });

        const res = await octokit.repos.createForAuthenticatedUser({
            name: projectName,
            description
        });

        console.log(chalk.green('Repository Created.'));
        console.log(res.data.html_url)
        return res.data.html_url;
    } catch (error) {
        console.log(error);
    }
};

exports.localRepo = (url) => {
    console.log('I am here');
    console.log(process.cwd());
    console.log(url);



    git()
        .init()
        .add('./*')
        .commit('first-commit')
        .addRemote('origin', url)
        .push('origin', 'master', () => {
            console.log(chalk.green('Local repo configed'))
            return true
        })

};