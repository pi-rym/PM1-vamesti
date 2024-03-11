import { technologys } from "./tech.js";

class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
  }

  saveActivity(param) {
    this.activities.push(param);
  }

  /**Solicita un elemento para construir la etiqueta */
  newActivity(element) {
    const getId = document.getElementById(element);

    while (getId.firstChild) {
      getId.removeChild(getId.firstChild);
    }

    this.activities.forEach((activities) => {
      const setCard = document.createElement("article");
      const frame = document.createElement("div");

      setCard.classList.add("card");
      frame.appendChild(document.createElement("img")).src = activities.imgUrl;
      //form.img;
      setCard.appendChild(frame);

      const title = setCard.appendChild(document.createElement("p")); //form.title;
      const description = setCard.appendChild(document.createElement("p")); //form.descriptcion;
      setCard.id = activities.id;

      title.classList.add("title-card");
      title.textContent = activities.title;
      description.classList.add("body-card");
      description.textContent = activities.description;

      /** Para vaciar el formulario */
      getId.append(setCard);
    });
  }
}

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

const repo = new Repository();

function getData(event) {
  /* Detiene el evento del submit para evitar que recarge la pagina */
  event.preventDefault();
  /** */
  const getForm = new FormData(event.target);

  const form = {
    title: getForm.get("title"),
    description: getForm.get("description"),
    img: getForm.get("image"),
  };

  /**Genera el ID contando los elementos en el div de actividades y luego lo asigna la nueva actividad */
  const id = document.querySelectorAll("#addActivity").length;
  const newActivity = new Activity(id, form.title, form.description, form.img);

  /**Se aguarda la actividad para aplicar la logica  */
  repo.saveActivity(newActivity);
  /*Crea el componente */
  repo.newActivity("addActivity");
  event.target.reset();
}
