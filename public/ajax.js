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

/* ————————————————————————— MENU INTERACTIONS ————————————————————————— */

// APPEND MENU ITEM (HELPER FUNCTION) \\
const appendMenuItem = menuItem => {
  const menuItemHTML = `
  <div class="gallery-page-${menuItem.food_category} gallery-page">
  <article class="gallery-item">
    <figure class="menu-item-position">
      <img src="${menuItem.item_img}" alt="Image" class="img-fluid gallery-img" />
      <figcaption>
        <h4 class="gallery-title">${menuItem.name}</h4>
        <p class="gallery-description">${menuItem.description}</p>
      </figcaption>
      <!-- Add to Order Button -->
      <button class="add-to-order-top-container">
        <div class="add-to-order-container">
          <div class="wrap">
            <div class="add-to-order-button">Add to Order</div>
            <div class="add-to-order-price">${"$" + menuItem.price / 100}</div>
          </div>
        </div>
      </button>
      <!-- /Add to Order Button -->
    </figure>
  </article>
</div>
  `;

  $(".gallery").append(menuItemHTML);
};
