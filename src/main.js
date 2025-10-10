import lemonade from "./img/lemonade.jpg";

const image = document.createElement("img");
image.id = "lemonade";
image.src = lemonade;

const headline = document.createElement("h1");
headline.innerText = "Welcome to our restaurant";

const desc = document.createElement("p");
desc.innerText = "The Lemonade Stand, a lovely establishment along the waterway serving world-renowned lemonade."

function firstLoad(content) {
    
    content.appendChild(headline);
    content.appendChild(image);
    content.appendChild(desc);
    
}

export { firstLoad };