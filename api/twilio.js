/*var client = require('twilio')(
  'AC8cfb45b8582801f9a1e5d15bd2266e62',
  '600a3635d5023f2dfe1f122da0e86485'
);
client.messages.create({
  from: "+18016093070",
  to: "+16477864414",
  body: "Your order is ready for pickup!"
}).then((message) => console.log(message.sid));
client.messages.create({
  from: "+18016093070",
  to: "+19058308227",
  body: "Your order is ready for pickup!"
}).then((message) => console.log(message.sid));
*/
const accountSid = 'AC8cfb45b8582801f9a1e5d15bd2266e62'; //process.env.TWILIO_ACCOUNT_SID;
const authToken  = '600a3635d5023f2dfe1f122da0e86485';  //process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);
// POST REQUEST
const smsRestaurant = (orderid, phone) => {
  const message = `CHA CHING. Order # Is: ${orderid}.`
  client.messages.create({
    from: "+18016093070", //twilio
    to: phone, //"+16477864414", //restaurant
    body: message
  },
//function(err, call) {
   // process.stdout.write(call.sid);
//});
  (err, message) => {
    if (err) {
      return err;
    }
  });
}
//Post Request
const smsCustomer = (orderid, time, phoneNumber) => {
  const message = `Yo Bro, Your Order # Is:${orderid} That Shit Will Be Ready In${time} Minuto(s)!`
  client.messages.create({
    from: "+18016093070", //twilio
    to: `+1${phoneNumber}`, //customer
    body: message
  }, (err, message) => {
    if (err) {
      return err;
    }
  });
}
// POST REQUEST
const smsReady = (orderid, phoneNumber) => {
  const message = `Hey There. Your Order ID From These Bad Ass Mofo's Is #${orderid} !`
  client.messages.create({
    from: "+18016093070", //twilio
    to: `+1${phoneNumber}`, //customer
    body: message
  }, (err, message) => {
    if (err) {
      return err;
    }
  });
}

module.exports = {
  restaurant: smsRestaurant,
  customer: smsCustomer,
  ready: smsReady
};
