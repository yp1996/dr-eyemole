
var python = require('python-shell');
//const spawn = require("child_process").spawn;
//const pythonProcess = spawn('python', ['./generate.py'])

const slashCommand = (body) => new Promise((resolve, reject) => {

	console.log("launching the process...");
	python.run("generate.py", function (err, results) { 
		console.log(results);
		resolve(results.toString());
	}
	//console.log(pythonProcess);
	/**
	pythonProcess.stdout.on("data", data =>{
        resolve(data.toString()); 
    })
    pythonProcess.stderr.on("data", reject)
    **/
});

module.exports = slashCommand;