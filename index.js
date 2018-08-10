require('dotenv').config();

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const welcome = require('./welcome');
const http = require("http");
const slashCommand = require("./slashCommand");
const spawn = require("child_process").spawn;
const pythonProcess = spawn("python", ["./generate.py"])
const qs = require('querystring');
const app = express();

/*
 * parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2 font-family=\'Montserrat\'>You have reached Dr Eyemole.</h2> <p font-family=\'Montserrat\'>Unfortunately, they are ' +
  'currently on sabbatical so they will not be able to answer your requests right now.' +
  ' Please <a href=\'https://www.eyemole.io\'> leave a message </a>. </p>');
});

/*
 * Endpoint to receive events from Slack's Events API.
 * Handles:
 *   - url_verification: Returns challenge token sent when present.
 *   - event_callback: Confirm verification token & handle `team_join` event.
 */
app.post('/events', (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      // verify Events API endpoint by returning challenge if present
      res.send({ challenge: req.body.challenge });
      break;
    }
    case 'event_callback': {
      if (req.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
        const event = req.body.event;

        // `team_join` is fired whenever a new user (incl. a bot) joins the team
        // check if `event.is_restricted == true` to limit to guest accounts
        if (event.type === 'team_join' && !event.is_bot) {
          const { team_id, id } = event.user;
          welcome.initialMessage(team_id, id);
        }
        res.sendStatus(200);
      } else { res.sendStatus(500); }
      break;
    }
    default: { res.sendStatus(500); }
  }
});

app.post('/media', (req, res) => {

  res.json({
          response_type: 'ephemeral',
          text: 'Digging into the collective subconscious, just wait a second...'
  });

  console.log("start digging");

  slashCommand(req.body)
    .then((result) => {
      //return res.json(result)

    console.log("okay we got smth");

    let options = {
          method: 'POST',
          uri: req.body.response_url,
          body:{
            response_type: 'in_channel',
            text: result},
          json: true,

    };

    console.log(options) 

    request(options, err => {
          if (err) console.log(err);
    });

    })
    .catch(console.error)
})

app.post('/todos', (req, res) => {

  console.log("channel " + req.body.channel_name);

  let searchOptions = {
      token: process.env.SLACK_TOKEN,
      query: "TODOS in:#" + req.body.channel_name,
      sort: "timestamp"
  };

  const params = qs.stringify(searchOptions);
  const searchTodos = axios.post('https://slack.com/api/search.messages', params)
  searchTodos.then(
    response => {

      console.log(response.body.messages.matches[0].text);

      res.json({response_type: 'ephemeral',
        text: response.body.messages.matches[0].text});

  }).catch(console.error)

})

setInterval(function() {
    http.get("http://dr-eyemole.herokuapp.com");
}, 300000);


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});

