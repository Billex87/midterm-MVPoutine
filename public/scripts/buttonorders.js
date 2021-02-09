$(document).ready(() => {
  $('.order-button').click(function () {
    const button = $(this);
    const div = button.parent();
    const container = div.parent();
    let p = container.find("p");
    let price = container.find(".foot").find("p").text();

    checkItemQuantity({ name: p.html(), price: price, quantity: 1 });

    // console.log('cartArr', cartArr);
    $('#poppin').removeClass('hidden-popup')

    // $.ajax({
    //   method: "POST",
    //   url: "/api/orders/"
    // }).done((res) => {
    //   console.log('Add item to order');
    // })
  });

  let cartArr = [];

  const checkItemQuantity = function (newItem) {
 let flag = false;
    for (let item of cartArr) {
      // console.log('forItem', item);

      if (item.name === newItem.name) {
        item.quantity = item.quantity + 1;
        // console.log('matched item', newItem); flag = true
        break;
      }
      // console.log("rendercartArr1", cartArr)
    }
      if (!flag){
        // console.log("else");
        cartArr.push({ name: newItem.name, price: newItem.price, quantity: 1 });
      }

    renderCart(cartArr);
  };

  $('#orderCompleteButton').click(function () {
    console.log('STEP UP');
    $.ajax({
      method: "POST",
      url: "/api/orders/complete"
    }).done((fuckya) => {
      console.log("fuckya");
    })
  });

  const createCartItem = function (name, price, quantity) {
    const $cart = $(`<li>${name}</li>
   <li class="popupcss">Price: ${price}</li>
   <li>Quantity: ${quantity}</li>
   `);
    return $cart;
  };

  const renderCart = function (cartItems) {
    const container = $(".nav-popup ul");
    // const totalPriceElement = $(".nav-popup .shopping-cart .shopping-cart-header .shopping-cart-total .total-price ");
    // if (totalPriceElement !== undefined) {
    //   totalPriceElement.remove()
    // }
    let totalPriceCart = 0;
    container.empty();
    for (let item of cartItems) {
      const $cart = $(`<li>${item.name}</li>
   <li>Price: ${item.price}</li>
   <li>Quantity: ${item.quantity}</li>
    `);
      container.append($cart);
      totalPriceCart += item.quantity * item.price;
    }
    const totalPriceElementContainer = $(".nav-popup .shopping-cart .shopping-cart-header .shopping-cart-total .total-price");
    totalPriceElementContainer.html((totalPriceCart));
    console.log(totalPriceCart);
  };
});
