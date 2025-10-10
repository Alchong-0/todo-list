const aboutUsInfo = document.createElement("p");
aboutUsInfo.innerText = "We are a lemonade stand restaurant founded by the national Lemonade Association."

function loadAbout(content) {
    content.appendChild(aboutUsInfo);
}

export { loadAbout };