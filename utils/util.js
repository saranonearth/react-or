const fs = require('fs');
const exec = require('child_process').exec;
const CLI = require('clui'),
    Spinner = CLI.Spinner;
const Configstore = require('configstore');
const getDetails = require('./getdetails');
const config = new Configstore('reactor')
const Octokit = require('@octokit/rest')


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
            await fs.mkdir(`${Name.projectName}`, () => {
                process.chdir(Name.projectName);
                console.log(process.cwd())
            })
        });
    } catch (error) {
        console.log(error)
    }
};

exports.getToken = () => {
    return config.get('github.token')
}



exports.registerToken = async () => {
    try {
        const Credentials = await getDetails.getCredentials();
        const clientWithAuth = new Octokit({
            auth: {
                username: Credentials.username,
                password: Credentials.password,
                async on2fa() {
                    return prompt('Two-factor authentication Code:')
                }
            }
        })
        console.log('here')
        const res = await clientWithAuth.oauthAuthorizations.createAuthorization({
            scopes: ['user', 'public_repo', 'repo', 'repo:status'],
            note: 'React-or, Creating Reactjs projects on the go with ease.'
        })

        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

// await exec('code .', () => {
//     console.log('done')
// })

// npx create-react-app ${Name.projectName}