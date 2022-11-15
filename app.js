"use strict";

// Selecting

let bill = document.getElementById("billAmount");
let people = document.getElementById("peopleAmount");
let reset = document.getElementById("reset");
let customTip = document.getElementById("customAmount");
let totalPerPerson = document.querySelector(".totalPerPersonNum");
let tipPerPerson = document.querySelector(".tipPerPersonNum");
const tipButton = Array.from(document.querySelectorAll(".tipBtn"));
let tipNum;

// Calculations

function calcTip() {
  tipPerPerson.textContent = parseFloat(
    (bill.value * tipNum) / people.value
  ).toFixed(2);
  totalPerPerson.textContent = parseFloat(
    (bill.value * tipNum) / people.value + bill.value / people.value
  ).toFixed(2);
}

function calcBill() {
  tipPerPerson.textContent = parseFloat((bill.value * 0.05) / 1).toFixed(2);
  totalPerPerson.textContent = parseFloat(
    bill.value / 1 + (bill.value * 0.05) / 1
  ).toFixed(2);
}

function calcPeople() {
  tipPerPerson.textContent = parseFloat(
    (bill.value * 0.05) / people.value
  ).toFixed(2);
  totalPerPerson.textContent = parseFloat(
    bill.value / people.value + (bill.value * 0.05) / people.value
  ).toFixed(2);
}

function notNumber() {
  if (isNaN(tipPerPerson.textContent)) {
    tipPerPerson.textContent = "0.00";
  }
  if (isNaN(totalPerPerson.textContent)) {
    totalPerPerson.textContent = "0.00";
  }
}

let buttonDis = function () {
  reset.style.backgroundColor = "#0D686D";
  reset.style.color = "rgba(0, 71, 75, 0.35)";
};

function buttonEnb() {
  if (bill.value > 0) {
    reset.style.backgroundColor = "#9FE8DF";
    reset.style.color = "#00474B";
  }

  if (people.value > 0) {
    reset.style.backgroundColor = "#9FE8DF";
    reset.style.color = "#00474B";
  }
}

// Check

function billCheck() {
  if (bill.value < 0) {
    bill.value = "";
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    reset.style.backgroundColor = "#9FE8DF";
    reset.style.color = "#00474B";
    bill.style.border = "5px solid red";
    document.getElementById("zero-1").style.display = "block";
    document.getElementById("zero-1").style.marginBottom = "-20px";
    document.getElementById("high-1").style.display = "none";
  }

  if (bill.value > 1000000) {
    bill.value = 1000000;
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    bill.style.border = "5px solid red";
    reset.style.color = "#00474B";
    bill.style.border = "5px solid red";
    document.getElementById("high-1").style.display = "block";
    document.getElementById("high-1").style.marginBottom = "-20px";
    document.getElementById("zero-1").style.display = "none";
  }

  if (bill.value > 0 && bill.value < 1000000) {
    document.getElementById("high-1").style.display = "none";
    document.getElementById("zero-1").style.display = "none";
    bill.style.border = "";
  }
}

function peopleCheck() {
  if (people.value < 0) {
    people.value = "";
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    people.style.border = "5px solid red";
    reset.style.backgroundColor = "#9FE8DF";
    reset.style.color = "#00474B";
    buttonDis();
    document.getElementById("zero-2").style.display = "block";
    document.getElementById("zero-2").style.marginBottom = "-20px";
    document.getElementById("high-2").style.display = "none";
  }

  if (people.value > 0 && people.value < 1000000) {
    document.getElementById("high-2").style.display = "none";
    document.getElementById("zero-2").style.display = "none";
    people.style.border = "";
  }

  if (people.value > 1000000) {
    people.value = 1000000;
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    people.style.border = "5px solid red";
    buttonEnb();
    document.getElementById("high-2").style.display = "block";
    document.getElementById("high-2").style.marginBottom = "-20px";
    document.getElementById("zero-2").style.display = "none";
  }
}

function customTipCheck() {
  if (customTip.value <= 0) {
    customTip.value = "";
    customTip.style.border = "5px solid red";
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
  }

  if (customTip.value > 0 && customTip.value < 99999) {
    customTip.style.border = "";
  }

  if (customTip.value > 99999) {
    customTip.value = 99999;
    customTip.style.border = "5px solid red";
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
  }

  reset.style.backgroundColor = "#9FE8DF";
  reset.style.color = "#00474B";
}

// Calculation

buttonDis();

for (let i = 0; i < tipButton.length; i++) {
  tipButton[i].addEventListener("click", function (event) {
    if (
      bill.value > 0 &&
      bill.value < 99999 &&
      people.value > 0 &&
      people.value < 999999
    ) {
      tipNum = parseFloat(event.target.textContent) / 100;
      calcTip();
      buttonEnb();
      notNumber();
      bill.style.border = "";
      people.style.border = "";
    }

    billCheck();
    peopleCheck();
  });

  customTip.addEventListener("input", function () {
    if (
      bill.value > 0 &&
      bill.value < 99999 &&
      people.value > 0 &&
      people.value < 99999
    ) {
      tipNum = customTip.value / 100;
      buttonEnb();
      calcTip();
      notNumber();
      bill.style.border = "";
      people.style.border = "";
    }

    billCheck();
    peopleCheck();
    customTipCheck();
  });

  bill.addEventListener("input", function () {
    if (
      bill.value > 0 &&
      bill.value < 99999 &&
      people.value > 0 &&
      people.value < 99999
    ) {
      calcBill();
      notNumber();
      reset.style.backgroundColor = "#9FE8DF";
      reset.style.color = "#00474B";
      bill.style.border = "";
      people.style.border = "";
    }

    billCheck();
    if (bill.value <= 0) {
      bill.value = "";
    }
  });

  people.addEventListener("input", function () {
    if (
      bill.value > 0 &&
      bill.value < 99999 &&
      people.value > 0 &&
      people.value < 99999
    ) {
      calcPeople();
      notNumber();
      reset.style.backgroundColor = "#9FE8DF";
      reset.style.color = "#00474B";
      bill.style.border = "";
      people.style.border = "";
    }

    peopleCheck();
    if (people.value <= 0) {
      people.value = "";
    }
  });

  // Reset

  reset.onclick = function () {
    buttonDis();
    bill.value = "";
    customTip.value = "";
    people.value = "";
    bill.style.border = "";
    people.style.border = "";
    customTip.style.border = "";
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    document.getElementById("zero-1").style.display = "none";
    document.getElementById("zero-2").style.display = "none";
    document.getElementById("high-1").style.display = "none";
    document.getElementById("high-2").style.display = "none";
  };
}
