
const slashCommand = (body) => new Promise((resolve, reject) => {

	console.log(body);

	return resolve({
      text: 'Eyemole: ???'
    });
});

module.exports = slashCommand;