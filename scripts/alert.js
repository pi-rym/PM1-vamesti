export function showAlert(title, description) {
  const div = document.createElement("div");
  div.classList.add("alertBody", "alertBodyShow");
  div.id = "alertShow";
  const h3 = document.createElement("h3");
  h3.classList.add("alertTitle");
  h3.textContent = title;
  const p = document.createElement("p");
  p.classList.add("alertDes");
  p.textContent = description;
  const button = document.createElement("button");
  button.classList.add("alertButton");
  button.textContent = "Aceptar";

  button.addEventListener('click',deleteAlert);

  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(button);
  document.querySelector("body").append(div);
  
}

function deleteAlert(){
    const div = document.getElementById("alertShow");
    if(div) div.remove();
}