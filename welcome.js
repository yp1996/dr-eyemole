const qs = require('querystring');
const axios = require('axios');

const postResult = result => console.log(result.data);

// default message - edit to include actual ToS
const message = {
  token: process.env.SLACK_TOKEN,
  as_user: true,
  link_names: true,
  text: 'Hello there, young one, and welcome to the ~cult~ cooperative!' +
  'You are about to embark on a long journey, so take this handbook with you to find out all that you need to know about this bizzarre land you just entered:' +
  'https://docs.google.com/document/d/1mGE-XIueb9B7I5oI_Ls2A-_f77MxrowYX4SNw2KViSM/edit?usp=sharing \n \n ' +
  'If you have any questions or if you find any misinformation in the document or if you just want to say hi to the Old Ones, send them a message at #board or #exec and they will say hi back :eyemole:',
};

const initialMessage = (teamId, userId) => {

    // send the default message as a DM to the user
    message.channel = userId;
    const params = qs.stringify(message);
    const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
    sendMessage.then(postResult);
};

module.exports = { initialMessage };
