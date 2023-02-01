const img1El = document.getElementById("img1");
const img2El = document.getElementById("img2");
const img3El = document.getElementById("img3");
const img4El = document.getElementById("img4");
const userDetailsEl = document.querySelector(".user-details");
const formContainerEl = document.querySelector(".form-container");
let diceEl = document.querySelector("#dice");
const btn = document.getElementById("btn");
let name;
let username;
let email;

img1El.addEventListener(
  "click",
  () => {
    formContainerEl.classList.remove("hide");
    name = formContainerEl.querySelector("#name").value;
    username = formContainerEl.querySelector("#username").value;
    email = formContainerEl.querySelector("#email").value;
    userDetailsEl.innerHTML = "";
  },
  { once: true }
);
btn.addEventListener("click", (e) => {
  e.preventDefault();
  name = formContainerEl.querySelector("#name").value;
  username = formContainerEl.querySelector("#username").value;
  email = formContainerEl.querySelector("#email").value;
  if (!email.includes("@")) {
    alert("Please enter a proper email id");
  } else if (name === "" || username === "" || email === "") {
    alert("Please fill form details Properly ");
  } else {
    formContainerEl.classList.add("hide");
    formContainerEl.querySelector("#name").value = "";
    formContainerEl.querySelector("#username").value = "";
    formContainerEl.querySelector("#email").value = "";
    userDetailsEl.innerHTML = `
    <h1> Please Click on Second Image to view your data </h1>`;
    hanldeimg2();
  }
});
function hanldeimg2() {
  img2El.addEventListener("click", function a() {
    userDetailsEl.innerHTML = `
      <h1> Username: ${username} </h1>
        <h1>name: ${name} </h1>
        <h3>Please click on third image to roll the dice</h3>
        `;
    handelimg3();
    img2El.removeEventListener("click", a);
  });
}

let sum = 0;
let count = 0;
let times = 0;

let sum1 = 0;
let count1 = 3;
let chances = 1;

diceEl.addEventListener("click", handleClick);
function handleClick() {
  if (count1 > 0) {
    let ran;
    ran = Math.floor(Math.random() * 6) + 1;
    sum1 += ran;
    count1--;
    document.querySelector(".p").innerHTML = `
    The sum is ${sum1}`;
  }
  if (sum1 > 10 && count1 === 0) {
    document.querySelector(".p").innerHTML = `
    The sum is ${sum1} you can click img 4`;
    alert("congrat sum is greater than 10");
    diceEl.classList.toggle("hide");
    img3El.removeEventListener("click", img3Func);

    img4El.addEventListener("click", hanldeimg4, { once: true });
  } else if (sum1 <= 10 && chances > 0 && count1 === 0) {
    count1 = 3;
    sum1 = 0;
    chances--;
    document.querySelector(".p").innerHTML = `
    The sum is ${sum1}`;
    diceEl.classList.toggle("hide");
    alert("sum is below 10 please try again by clicking image 3");
    handelimg3();
  } else if (sum1 <= 10 && chances === 0 && count1 === 0) {
    alert("Bad Luck cannot try more than 2 time");
    document.querySelector(".p").innerHTML = `
    Bad Luck Cannot try more`;
    diceEl.classList.toggle("hide");

    img3El.removeEventListener("click", img3Func);
  }
}


function handelimg3() {
  img3El.addEventListener("click", img3Func, { once: true });
}

function img3Func() {
  userDetailsEl.innerHTML = "";
  diceEl.classList.remove("hide");
}
function getRandom() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
}

function hanldeimg4() {
  let random = crypto.randomUUID();
  random = random.slice(-12, -1);
  document.querySelector(".p").innerHTML = `
      The coupon code  ${"#" + random}
        <img src="congrats.webp" id="img4" />
      `;
}