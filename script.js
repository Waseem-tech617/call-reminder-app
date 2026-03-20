// All selected variables
let addbtn = document.querySelector(".add-btn");
let noteform = document.querySelector(".Note-form");
let img = document.querySelector(".image-url");
let home = document.querySelector(".home-town");
let cards = document.querySelector(".cards");
let names = document.querySelector(".names");
let purpose = document.querySelector(".purpose");
let Bookings = document.querySelector(".Bookings");
let call = document.querySelector(".call");
let massage = document.querySelector(".massage");
let createbtn = document.querySelector(".submit-btn");
let checkbox = document.querySelectorAll('input[name="Catagory"]');
let form = document.querySelector("form");
let closeForm = document.querySelector(".close-btn");
let arrouwupbtn = document.querySelector(".arrow-up-btn");
let arrowdoenbtn = document.querySelector(".arrow-down-btn");

// This function Data save in localstorage .
function savelocalstorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldtasks = [];
    oldtasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldtasks));
  } else {
    let oldtasks = JSON.parse(localStorage.getItem("tasks"));
    oldtasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldtasks));
  }
};

//This evevt for Form validation and apply saved data of localstorage and showcards on webpage.
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let imageurl = img.value.trim();
  let hometown = home.value.trim();
  let namesinput = names.value.trim();
  let purposes = purpose.value.trim();
  let selected = "";
  checkbox.forEach(function (val) {
    if (val.checked) {
      selected = val.value;
    }
  });

  if (img.value == "") {
    alert("Plz Enter your image URL");
    return;
  }
  if (home.value == "") {
    alert("Plz Enter your hometown");
    return;
  }
  if (names.value == "") {
    alert("Plz Enter your FullName");
    return;
  }
  if (purpose.value == "") {
    alert("Plz enter your purose");
  }
  if (!selected) {
    alert("Plz select a catagory");
    return;
  }

  savelocalstorage({
    imageurl,
    hometown,
    namesinput,
    purposes,
    selected,
  });

  form.reset();

  noteform.style.display = "none";

  createcards();
});

// This function creating card .
function createcards() {
  cards.innerHTML = "";
  let altasks = JSON.parse(localStorage.getItem("tasks"));
  altasks.forEach(element => {
    let card1 = document.createElement("div");
    card1.classList.add("card");

    let image = document.createElement("img");
    image.classList.add("img");
    image.src = element.imageurl;

    let nm = document.createElement("h2");
    nm.textContent = element.namesinput;

    let hometown = document.createElement("h4");
    hometown.classList.add("home-town");
    hometown.textContent = "Home Town";

    let cityname = document.createElement("h4");
    cityname.classList.add("city");
    cityname.textContent = element.hometown;

    let booking = document.createElement("h4");
    booking.textContent = "Booking";

    let bookings = document.createElement("h4");
    bookings.textContent = element.selected;
    bookings.classList.add("Bookings");

    let callbtn = document.createElement("button");
    callbtn.textContent = " Call";
    callbtn.classList.add("call");

    let massage = document.createElement("h3");
    massage.classList.add("massage");
    massage.textContent = element.purposes;

    // append the cards
    cards.appendChild(card1);
    card1.appendChild(image);
    card1.appendChild(nm);
    card1.appendChild(hometown);
    card1.appendChild(cityname);
    card1.appendChild(booking);
    card1.appendChild(bookings);
    card1.appendChild(callbtn);
    card1.appendChild(massage);
  });
}

// This eventlistener used for show the form.
addbtn.addEventListener("click", function (dets) {
  noteform.style.display = "initial";
});

// This eventlistener used for close the form.
closeForm.addEventListener("click", function () {
  noteform.style.display = "none";
});

// This eventlistener used for drag the cards from up to down.
arrowdoenbtn.addEventListener("click", function () {
  let firstcard = cards.firstElementChild;
  if (firstcard) {
    cards.appendChild(firstcard);
  };
});

// This eventlistener used for drag the cards from down to up.
arrouwupbtn.addEventListener("click", function () {
  let lastcard = cards.lastElementChild;
  if (lastcard) {
    cards.insertBefore(lastcard, cards.firstElementChild);
  };
})