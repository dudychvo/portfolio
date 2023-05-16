new WOW().init();
const swiper = new Swiper(".swiper", {
  pagination: {
    el: ".projects-pagination",
    bulletClass: "projects-bullet",
    bulletActiveClass: "projects-bullet-active",
    clickable: true,
  },
});

let obj = {};
let name;
let email;

// var raw = JSON.stringify(obj);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (const pair of formData.entries()) {
    if (pair[0] === "name") {
      name = pair[1];
    }
    if (pair[0] === "email") {
      email = pair[1];
    }
    obj = {
      ...obj,
      name: name,
      email: email,
    };
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
    redirect: "follow",
  };

  function sumbitAction() {
    let nameField = document.getElementById("name").value;
    let emailField = document.getElementById("email").value;
    if ((nameField != "") & (emailField != "")) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
    }
  }

  let emailText = document.getElementById("email").value;
  let pattern = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
  let result = pattern.test(emailText);

  if (result) {
    fetch("https://644c4ac917e2663b9d0406ce.mockapi.io/contact", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => sumbitAction())
      .then(() => alert("Your form was submitted. Thanks! 😉"));
  } else {
    alert("Wrong email. Please, try agian 😓");
  }
});
