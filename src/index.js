// src/index.js
import "./styles.css";

import { firstLoad } from "./main.js";
import { loadMenu } from "./menu.js";
import { loadAbout } from "./about.js";

const content = document.getElementById('content');

const tabs = document.getElementsByTagName('button');

function changeTabs(event) {
    content.innerHTML = '';
    switch(event.currentTarget.getAttribute("id")) {
        case 'home':
            firstLoad(content);
            break;
        case 'menu':
            loadMenu(content);
            break;
        case 'about':
            loadAbout(content);
            break;
    }
}

for (const tab of tabs) {
    console.log(tab);
    tab.addEventListener("click", changeTabs);
}

firstLoad(content);
