// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')('AC8cfb45b8582801f9a1e5d15bd2266e62', 'ccfaf19142050b4c79b17c8c206bb731');

client.messages
  .create({
     body: 'WHAT IS UP YOU POUTINE LOVERS',
     from: '+18016093070',
     to: '+17782146187'
   })
  .then(message => console.log(message.sid));
