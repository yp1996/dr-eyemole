
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python', ['./generate.py'])

const slashCommand = (body) => new Promise((resolve, reject) => {

	pythonProcess.stdout.on("data", data =>{
        resolve(data.toString()); 
    })
    pythonProcess.stderr.on("data", reject)
});

module.exports = slashCommand;