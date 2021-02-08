$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((shit) => {
    for(const user of shit.users) {
      // $("<div>").text(user.name).appendTo($("body"));
    }
  });
});
