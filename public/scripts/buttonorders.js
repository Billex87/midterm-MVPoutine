$(document).ready(() => {
  $('.order-button').click(function () {
    $(".shopping-cart").show()
    const button = $(this);
    const div = button.parent();
    const container = div.parent();
    let p = container.find("p");
    let price = container.find(".foot").find("p").text();
    console.log('price', price);
    let priceTwo = price.slice(2);
    console.log('price2', priceTwo);
    checkItemQuantity({ name: p.html(), price: Number(priceTwo), quantity: 1, id: button.data('id') });
    $('#poppin').removeClass('hidden-popup');

    console.log('cartArr', cartArr);

  });
  $('.nav-popup button').click(function (event) {
    console.log('RUNNING');
    event.preventDefault();
    console.log(cartArr);
    $.post(
      "/api/orders", { cart: cartArr })
      .then(() => {
        window.location.href = "http://localhost:8080/api/orders";
      })
      .catch(error => { console.log("ERROR", error); });
  });
  let cartArr = [];
  const checkItemQuantity = function (newItem) {
    let flag = false;
    for (let item of cartArr) {
      console.log('forItem', item);

      if (item.name === newItem.name) {
        item.quantity = item.quantity + 1;
        console.log('matched item', newItem); flag = true;
        break;
      }
      console.log("rendercartArr1", cartArr);
    }
    if (!flag) {
      console.log("else");
      cartArr.push({ name: newItem.name, price: newItem.price, quantity: 1, id: newItem.id });
      console.log(newItem.id);
    }
    renderCart(cartArr);
  };

  $('#orderCompleteButton').click(function (event) {
    const $timer = $(event.currentTarget).siblings('#countdown-timer');
    $timer.attr('data-status', "Done");
    console.log($timer);
    $timer.text("Completed");
    $('#orderCompleteButton').hide();
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
    let totalPriceCart = 0;
    let totalQuantityCart = 0;
    container.empty();
    for (let item of cartItems) {
      const $cart = $(`<div>
      <li>${item.name}</li>
   <li>Price: ${item.price}</li>
   <li>Quantity: ${item.quantity}</li>
   <button class="removeItemButton" value="X" data-id="${item.id}">X</button>
   </div>
    `);
      container.append($cart);
      totalPriceCart += item.quantity * item.price;
      totalQuantityCart += item.quantity;
    }
    const totalPriceElementContainer = $(".nav-popup .shopping-cart .shopping-cart-header .shopping-cart-total .total-price");
    totalPriceElementContainer.html((totalPriceCart));
    const totalQuantityElementContainer = $(".nav-popup .shopping-cart .shopping-cart-header .total-quantity");
    totalQuantityElementContainer.html((totalQuantityCart));
    $('.removeItemButton').click(function () {
      // $(this).closest('div').remove();
      let id = $(this).data('id');
      console.log('beforeCartArr', cartArr)
      cartArr = removeItemFromCart(cartArr, id);// remove the closest li item row
      renderCart(cartArr)
      console.log('newcartArr', cartArr)
      hideCart(cartArr)
    });
  };

  const removeItemFromCart = (cartArr, id) => {
    let newCartArr = [];
    for (let item of cartArr) {
      if (item.id !== id) {
        newCartArr.push(item);
      }
    }
    return newCartArr;
  };

  const hideCart = (cartArr) => {
    if (cartArr.length === 0) {
      $(".shopping-cart").hide()
    }
  }


});
