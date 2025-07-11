/**
 * Calculates the age in years, months, and days between a birthdate and a current date.
 *
 * @param {Date} birthDate The birthdate.
 * @param {Date} currentDate The current date.
 * @returns {object} An object containing years, months, and days.
*/


const ageForm = document.getElementById("ageForm");
const day = document.getElementById("day");
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
    showError(yearError, year, "This feild is required");
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
    // turn into a number
    const enteredDay = parseInt(day.value.trim());
    const enteredMonth = parseInt(month.value.trim()) - 1;
    const enteredYear = parseInt(year.value.trim());

    const { yearResult, monthResult, dayResult } = calculateAge(
      enteredDay,
      enteredMonth,
      enteredYear
    );
    showResults(yearResult, monthResult, dayResult);
  }
});

function showError(errorMsg, input, message) {
  errorMsg.textContent = message;
  errorMsg.classList.add("visible");
  input.classList.add("error");
}

function showResults(yearResult, monthResult, dayResult) {
  let displayYears = document.getElementById("displayYears");
  let displayMonths = document.getElementById("displayMonths");
  let displayDays = document.getElementById("displayDays");

  displayYears.textContent = yearResult;
  displayMonths.textContent = monthResult;
  displayDays.textContent = dayResult;
}

function calculateAge(enteredDay, enteredMonth, enteredYear) {
  const birthDate = new Date(enteredYear, enteredMonth, enteredDay); // Month is 0-indexed, so 7 is August
  currentDate = new Date(2025, 6, 11);

  let yearResult = currentDate.getFullYear() - birthDate.getFullYear();
  let monthResult = currentDate.getMonth() - birthDate.getMonth();
  let dayResult = currentDate.getDate() - birthDate.getDate();

  // Adjust months and years if the current day is before the birth day
  if (dayResult < 0) {
    monthResult--;
    // Calculate days in the previous month (birth month)
    const daysInLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    dayResult += daysInLastMonth;
  }

  // Adjust years if the current month is before the birth month (or if month became negative)
  if (monthResult < 0) {
    yearResult--;
    monthResult += 12;
  }
  return { yearResult, monthResult, dayResult };
}
