import lemonade1 from "./img/menu-lemonade.jpg";
import lemonade2 from "./img/strawberry-lemonade.jpg";

const image1 = document.createElement("img");
image1.className = "menu-item";
image1.src = lemonade1;

const image2 = document.createElement("img");
image2.className = "menu-item";
image2.src = lemonade2;

const menuItem1 = document.createElement("div");
const menuItem2 = document.createElement("div");
const menuContainer = document.createElement("div");
menuContainer.id = "menu-container";

function loadMenu(content) {
    menuItem1.appendChild(image1);
    menuItem2.appendChild(image2);
    menuContainer.appendChild(menuItem1);
    menuContainer.appendChild(menuItem2);
    content.appendChild(menuContainer);
}

export { loadMenu };