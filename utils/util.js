const fs = require('fs')
const exec = require('child_process').exec;
const CLI = require('clui'),
    Spinner = CLI.Spinner;


exports.currentPath = () => {
    return process.cwd()
}

exports.fileExists = (project) => {
    if (fs.existsSync(`${process.cwd()}/${project}`)) {
        return true
    } else {
        return false
    }
}

exports.createReactApp = async (Name) => {
    const spinning = new Spinner('Creating React Project', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
    spinning.start();


    await exec(`npx create-react-app ${Name.projectName}`, (err, stdout, stderr) => {
        if (err) return ('Something went wrong')

        spinning.stop()
        console.log('Finished creating react app')

    })

}