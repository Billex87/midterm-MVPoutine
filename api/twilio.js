const accountSid = 'AC8cfb45b8582801f9a1e5d15bd2266e62'; //process.env.TWILIO_ACCOUNT_SID;
const authToken  = '50b6c9f8bd27368b513fe4d8ee036755';  //process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);
// POST REQUEST
const smsOrderIn = (orderID, totalPrice) => {
  const message = `Your Order # Is: ${orderID} Your Total Is: $${totalPrice}. `
  client.messages.create({
    from: "+18016093070", //twilio
    to: "+17782146187",  //customer
    body: message
  },
  (err, message) => {
    if (err) {
      return err;
    }
  });
}
const smsRestaurant = (orderID) => {
  const message = `You Have A New Order. Please Advise When Completed. Order #${orderID}. `
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

//Post Request
const smsReady = () => {
  const message = `We've Poutine Extra Effort, Your Order Is Ready!`
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
  smsReady,
  smsRestaurant
};
