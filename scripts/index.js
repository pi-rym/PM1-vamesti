import { technologys } from "./tech.js";

window.onload = () => {
  for (const key in technologys) {
    let box = document.getElementById("favTec");
    let article = document.createElement("article");
    let img = document.createElement("img");
    let p = document.createElement("p");

    box.append(article);
    article.classList.add("kanit-extralight");
    article.appendChild(img).src = technologys[key].img;
    article.appendChild(p).textContent = technologys[key].name;
  }

  /**Activa el evento del boton */
  const submitButton = document.getElementById("newActivity");

  submitButton.addEventListener("submit", getData);
};

function getData(event) {
  /* Detiene el evento del submit para evitar que recarge la pagina */
  event.preventDefault();
  /** */
  const getForm = new FormData(event.target);

  const form = {
    title: getForm.get("title"),
    img: getForm.get("image"),
    descriptcion: getForm.get("description"),
  };

  const getId = document.getElementById("addActivity");
  const setCard = document.createElement("article");
  const frame = document.createElement("div");

  setCard.classList.add("card");
  frame.appendChild(document.createElement("img")).src = form.img;
  //form.img;
  setCard.appendChild(frame);

  const title = setCard.appendChild(document.createElement("p")); //form.title;
  const description = setCard.appendChild(document.createElement("p")); //form.descriptcion;

  title.classList.add("title-card");
  title.textContent = form.title;
  description.classList.add("body-card");
  description.textContent = form.descriptcion;

  /** Para vaciar el formulario */
  event.target.reset();
  getId.append(setCard);
}
