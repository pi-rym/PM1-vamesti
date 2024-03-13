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
    this.activities.filter((activity) => activity.id !== id);
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
  const submitButton = document.getElementById("newActivity");
  submitButton.addEventListener("submit", getData);
};

function getData(event) {
  /* Detiene el evento del submit para evitar que recarge la pagina */
  event.preventDefault();

  /** OBTIENE LA INFORMACION DE LOS IMPUT*/
  const getForm = new FormData(event.target);
  /**CREA EL OBJETO */
  const form = {
    title: getForm.get("title"),
    description: getForm.get("description"),
    img: getForm.get("image"),
  };
  /**VALIDA LOS CAMPOS */
  if (
    form.title.trim() === "" ||
    form.description.trim() === "" ||
    form.img.trim() === ""
  ) {
    alert("Todos los campos son obligatorios.");
    return;
  }

   

  /**Crea la actividad llamando a la instancia de Repository */
  newActivities.createActivity(form.title, form.description, form.img);

  /**Resetea el formulario */
  event.target.reset();


  /**Solicita un elemento para construir la etiqueta */
  const getId = document.getElementById("addActivity");

  const newDiv = document.createElement("div");
  newDiv.classList.add("addActivity");

  const listActivities = newActivities.getAllActivities();

  listActivities.forEach((activities) => {
    const setCard = document.createElement("article");
    const frame = document.createElement("div");

    setCard.classList.add("card");

    const img = document.createElement("img");
    img.src = activities.imgUrl;
    frame.appendChild(img);
    setCard.appendChild(frame);

    const title = document.createElement("p");
    title.classList.add("title-card");
    title.textContent = activities.title;
    setCard.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("body-card");
    description.textContent = activities.description;
    setCard.appendChild(description);

    setCard.id = activities.id;

    newDiv.appendChild(setCard);
    console.log(newDiv);
  });

  getId.append(newDiv);
}
