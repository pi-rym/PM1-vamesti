import { showAlert } from "../scripts/alert.js";

const technologys = {
  0: {
    name: "CSS",
    img: "/assets/img/css.png",
  },
  1: {
    name: "HTML",
    img: "/assets/img/html.png",
  },
  2: {
    name: "JAVASCRIPT",
    img: "/assets/img/js.png",
  },
  3: {
    name: "NODE",
    img: "/assets/img/node.png",
  },
  4: {
    name: "ANGULAR",
    img: "/assets/img/angular.png",
  },
};

const getId = document.getElementById("addActivity");

/**HOMEWORK 2 */
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
    /**Propiedad activities => Un arreglo para almacenar las actividades. */
    this.activities = [];
    this.cont = 1;
  }

  /**Método getAllActivities => Debe retornar un arreglo con todas las actividades. */
  getAllActivities() {
    return this.activities;
  }

  /**Método createActivity => Debe instanciar una actividad con los datos correspondientes y almacenarla en su arreglo. */
  createActivity(title, description, imgUrl) {
    /**Se instacia la Clase */
    const id = this.cont;
    const newActivity = new Activity(id, title, description, imgUrl);
    this.cont++;
    this.activities.push(newActivity);
  }

  /*EXTRA CREDIT. Método deleteActivity => Debe recibir un id y filtrar el arreglo para eliminar la actividad correspondiente.*/
  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id != id);
  }
}

/**HOMEWORK 3 */
const newActivities = new Repository();

window.onload = () => {
  for (const key in technologys) {
    const box = document.getElementById("favTec");
    const article = document.createElement("article");
    const img = document.createElement("img");
    const p = document.createElement("p");

    box.append(article);
    article.classList.add("kanit-extralight");
    article.appendChild(img).src = technologys[key].img;
    article.appendChild(p).textContent = technologys[key].name;
  }

  /**Activa el evento del boton */
  const submitForm = document.getElementById("newActivity");
  submitForm.addEventListener("submit", getData);
};

function getData(event) {
  /* Detiene el evento del submit para evitar que recarge la pagina */
  event.preventDefault();

  /** OBTIENE LA INFORMACION DE LOS IMPUT*/
  const getForm = new FormData(event.target);
  /**Crea un nuevo objeto*/

  /**CREA EL OBJETO */
  const form = {
    title: getForm.get("title"),
    description: getForm.get("description"),
    img: getForm.get("image"),
  };
  /**VALIDA LOS CAMPOS */
  if (!form.title || !form.description || !form.img) {
    showAlert("Vacio", "Todos los campos son requeridos");
    return;
  }

  /**Crea la actividad llamando a la instancia de Repository */
  newActivities.createActivity(form.title, form.description, form.img);

  /**Resetea el formulario */
  event.target.reset();

  const listActivities = newActivities.getAllActivities();

  insertActivities(listActivities);
}

/**Solicita un elemento para construir la etiqueta */
function insertActivities(list) {
  deleteAllActivities();

  const newDiv = document.createElement("div");
  newDiv.classList.add("addActivity");

  /**Utilizar map para iterar sobre las actividades obtenidas */
  const add = list.map((activities) => createActivities(activities));

  /**Recorremos el array de elementos html para insertarlos en el dom */
  add.forEach((activities) => {
    newDiv.appendChild(activities);
  });

  getId.append(newDiv);
}

/**Limpia el dom antes de renderizas las actividades nuevas*/
function deleteAllActivities() {
  const div = getId.querySelector(".addActivity");
  if (div) {
    getId.removeChild(div);
  }
}

/**Crea cada etiqueta */
function createActivities(activities) {
  /**Aplicar destructurin para obtener los datos */
  const { id, title, description, imgUrl } = activities;
  const setCard = document.createElement("article");
  const frame = document.createElement("div");

  setCard.classList.add("card");

  const deletButton = document.createElement("button");
  deletButton.classList.add("deleteButton");
  deletButton.textContent = "X";
  deletButton.id = id;
  setCard.appendChild(deletButton);
  deletButton.addEventListener("click", deleteActivity);

  const img = document.createElement("img");
  img.src = imgUrl;
  frame.appendChild(img);
  setCard.appendChild(frame);

  const titleIn = document.createElement("p");
  titleIn.classList.add("title-card");
  titleIn.textContent = title;
  setCard.appendChild(titleIn);

  const descriptionIn = document.createElement("p");
  descriptionIn.classList.add("body-card");
  descriptionIn.textContent = description;
  setCard.appendChild(descriptionIn);

  return setCard;
}

function deleteActivity(event) {
  const activity = event.target.id;
  newActivities.deleteActivity(activity);
  const list = newActivities.getAllActivities();
  insertActivities(list);
}
