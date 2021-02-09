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
const authToken  = '0b6c9f8bd27368b513fe4d8ee036755';  //process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);
// POST REQUEST
const smsOrderIn = (order_items, phone) => {
  const message = `CHA CHING. Order # is: ${1}. For your order of: ${JSON.stringify(order_items)}.`
  console.log((order_items, "ORDER ITEMS"));
  // console.log((order_items.keys));
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
  smsOrderIn,
  customer: smsCustomer,
  ready: smsReady
};
