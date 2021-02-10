const accountSid = 'AC8cfb45b8582801f9a1e5d15bd2266e62'; //process.env.TWILIO_ACCOUNT_SID;
const authToken  = '50b6c9f8bd27368b513fe4d8ee036755';  //process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);
// POST REQUEST

const smsOrderIn = (orderID, totalPrice) => {
  const message = `Thanks, your order is #: ${orderID} and your total cost is: $${totalPrice}. Ready in 20 minutes or expect a text sooner. `

  client.messages.create({
    from: "+18016093070", //twilio
    to: "+17782146187",  //restaurant
    body: message
  },
  (err, message) => {
    if (err) {
      return err;
    }
  });
}
//Post Request
const smsReady = () => {
  const message = `Yo Bro, Your Shit Is Ready, Come Get It You Lazy Fuck!`
  client.messages.create({
    from: "+18016093070", //twilio
    to: "+17782146187", //customer
    body: message
  }, (err, message) => {
    if (err) {
      return err;
    }
  });
}

module.exports = {
  smsOrderIn,
  smsReady
};
