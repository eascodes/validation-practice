const form = document.querySelector("form");

// Set input variables
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zip = document.querySelector("#zip");
const pwd = document.querySelector("#password1");
const pwd2 = document.querySelector("#password2");

// Set error variables
const emailError = document.querySelector("#email + span.error");
const countryError = document.querySelector("#country + span.error");
const zipError = document.querySelector("#zip + span.error");
const pwdMatchError = document.querySelector("#password2 + span.error");

function addListeners(item, itemError, valueMsg, typeMsg, label) {
    item.addEventListener("input", () => {
        if (item.validity.valid) {
            itemError.textContent = "";
            itemError.className = "error";
        } else {
            showError(item, itemError, valueMsg, typeMsg, label);
        }
    });
}

// Show correct error messages
function showError(item, itemError, valueMsg, typeMsg, label) {
    if (item.validity.valueMissing) {
        itemError.textContent = valueMsg;
    } else if (item.validity.typeMismatch) {
        itemError.textContent = typeMsg;
    } else if (item.validity.tooShort) {
        itemError.textContent = `${label} should be at least ${item.minLength} characters; you entered ${item.value.length}`;
    } else if (item.validity.patternMismatch) {
        itemError.textContent = typeMsg;
    }   
    itemError.className = "error active";
}

addListeners(
    email, 
    emailError, 
    "You need to enter an email address", 
    "Entered value needs to be an email address", 
    "Email"
    );

addListeners(
    country, 
    countryError, 
    "You need to enter a country", 
    "Entered value needs to be a country", 
    "Country"
    );

addListeners(
    zip, 
    zipError, 
    "You need to enter a zipcode", 
    "Entered value needs to be a zipcode", 
    "Zipcode"
    ); 

// Password validation
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

// Display password validation message when clicking on input field
pwd.onfocus = function() {
    document.getElementById("message").style.display = "block";
}
// Hide message when clicking away from input field if pwd is valid
pwd.onblur = function() {
    if (pwd.validity.valid) {
        document.getElementById("message").style.display = "none";
    }
}

// When the user starts to type something inside the password field
pwd.onkeyup = function() {
    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    if(pwd.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
  }
  
    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if(pwd.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    const numbers = /[0-9]/g;
    if(pwd.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(pwd.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

// Check if password inputs match
pwd2.addEventListener("input", () => {
    if (pwd2.value !== pwd.value) {
        pwdMatchError.textContent = "Passwords must match.";
        pwdMatchError.className = "error active";
    } else {
        pwdMatchError.textContent = "";
        pwdMatchError.className = "error";
    }
})

// Overall form validation upon submission
let result = true;
const checkForm = (arguments) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Check for invalid or empty arguments
        for (let i=0; i < arguments.length; i += 1) {
            if (!arguments[i].validity.valid) {
                result = false;
                break;
            } else if (arguments[i].value === "") {
                result = "empty";
                break;
            }
        }
        // Show correct alert message
        if (result === false) {
            alert("Please correct the form errors shown below");
            result = true;
        } else if (result === "empty") {
            alert("Please fill in answers to all fields");
            result = true;
        } else if (pwd.value !== pwd2.value) {
            alert("Passwords must match - please try again.");
        } else { alert("High five!") }
    })
}

checkForm([email, country, zip, pwd, pwd2]);