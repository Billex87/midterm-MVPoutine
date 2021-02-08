$(document).ready( () => {
  $('.order-button').click(() => {
    console.log('hello');
    $.ajax({
      method: "POST",
      url: "/api/orders/"
    }).done((res) => {
      console.log('Add item to order');
    });
  })
})
