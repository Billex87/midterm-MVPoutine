$(document).ready( () => {
  $('.order-button').click(function() {
    const button = $(this);
    const div = button.parent()
    const container = div.parent()
    const p = container.find("p")
    const price = container.find(".foot").find("p").text()
    // console.log("THE P", p.html());
    // console.log("Price", price);
    cartArr.push({name:p.html(), price:price});
    console.log(cartArr);
    const newCartItem = createCartItem(p.html(), price);
    renderCart(newCartItem);

    // $.ajax({
    //   method: "POST",
    //   url: "/api/orders/"
    // }).done((res) => {
    //   console.log('Add item to order');
    // })
  })

  let cartArr = [];
//number of items function?
//work on the order button




 //this is all within the document ready

 const createCartItem = function(name, price) {
   const $cart= $(`<li>${name}</li>
   <li>Price: ${price}</li>
   <li>Quantity: 1</li>
   `);
     return $cart;
 }

 const renderCart = function(cartItems) {
  const container = $(".nav-popup ul");
  for (let item of cartItems) {
    container.append(item);
  }
};


});
