const ageForm = document.getElementById("ageForm");
const day = document.getElementById('day')
const month = document.getElementById("month");
const year = document.getElementById("year");



const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");


ageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // validation
  let valid = true;

  //reset error mesg for day
  dayError.textContent = "";
  day.classList.remove("error");
  dayError.classList.remove("visible");

  // reset error msg for month
  monthError.textContent = "";
  month.classList.remove("error");
  monthError.classList.remove("visible");

  // reset error msg for year
  yearError.textContent = "";
  year.classList.remove("error");
  yearError.classList.remove("visible");

  if (!day.checkValidity()) {
    if (day.value == "") showError(dayError, day, "This feild is required");
    else showError(dayError, day, "Must be a valid day");
    valid = false;
  }

  if (!month.checkValidity()) {
    if (month.value == "") showError(monthError, month, "This feild is required");
    else showError(monthError, month, "Must be a valid month");
    valid = false;
  }
    
    const yearValue = year.value.trim();
    const currYear = new Date().getFullYear();
    
    if (year.value == "") {
        showError(yearError, year, "This feild is required")
        valid = false;
    }
    // Check if it's not a valid 4-digit number
    else if (!/^\d{4}$/.test(yearValue)) {
        showError(yearError, year, "Enter a valid 4-digit year");
        valid = false;
    }
    // Check if year is in the future
    else if (parseInt(yearValue) > currYear) {
        showError(yearError, year, "Must be the current year or earlier");
        valid = false;
    }


  if (valid) {
    findOutAge();
    alert("Form is valid!");
  }
});

function showError(errorMsg, input, message) {
    errorMsg.textContent = message;
    errorMsg.classList.add("visible");
    input.classList.add("error");
}

function findOutAge() {
  /*
        aug 13 2000
        july 11 2025
        your age is 24 years, 11 months, and 11 days
    */

  const currentDate = new Date();

    // 2025 - 2000
    // aug 24 till july 25
    
    // since aug didnt come yet figure out when itll come but 
    if (month > currentDate.getMonth()) {
    let yearResult = (currentDate.getFullYear() - year.value) - 1
        let monthResult = (currentDate.getMonth() - 1) 
        

    }
}