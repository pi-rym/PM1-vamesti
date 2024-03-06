import { technologys } from "./tech.js";

window.onload = () => {
  for (const key in technologys) {
    let box = document.getElementById("favTec");
    let article = document.createElement('article');
    let img =document.createElement('img');
    let p = document.createElement('p');

    box.append(article)
    article.classList.add("kanit-extralight");
    article.appendChild(img).src = technologys[key].img;
    article.appendChild(p).textContent = technologys[key].name;
  }
};
