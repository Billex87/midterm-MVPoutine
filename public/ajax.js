/* ————————————————————————— AJAX REQUESTS ————————————————————————— */

// GET MENU ITEMS FROM SQL DATABASE, SAVE TO LOCAL STORAGE, RENDER ON MAIN PAGE \\
const getAndRenderMenu = () => {
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    localStorage.setItem('food', JSON.stringify(res.menu));
    for (food of res.menu) {
      appendMenuItem(food);
    }
  });
};
