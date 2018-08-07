
var python = require('python-shell');
//const spawn = require("child_process").spawn;
//const pythonProcess = spawn('python', ['./generate.py']);

var options = {
  mode: 'text',
  pythonOptions: ['-u']
};

const slashCommand = (body) => new Promise((resolve, reject) => {

	console.log("launching the process...");
	
	python.run("./generate.py", options, function (err, results) { 
		console.log(err);
		console.log(err.stack);
		console.log(results);
		if (err) {
			reject();
		}
		resolve(results.toString());
	});
	
	//console.log(pythonProcess);
	
	/*
	pythonProcess.stdout.on("data", data =>{
        resolve(data.toString()); 
    });
    pythonProcess.stderr.on("data", data => {
    	console.log(data);
    	reject;
    })
    */
    
});

module.exports = slashCommand;