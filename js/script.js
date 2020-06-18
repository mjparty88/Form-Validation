/*Set focus on the first text field
- When the page first loads, the first text field should be in focus by default.
*/

let nameField = document.getElementById('name');
nameField.focus();

/*Job Role section
- assign the selection with job titles to jobRoleDropdown
- create a text input element for the user to input their otherJobRole
- create a lable for the jobRole text input
- add placeholder text to the otherJobRole input
- make the text input and label hidden by default
- append the label and text input into the DOM at the end of the first fieldset
*/

//create the element (i'm going to give it a label too)
let jobRoleDropdown = document.getElementById("title")
let otherJobRole = document.createElement("input")
let otherJobRoleLabel = document.createElement("label")
otherJobRole.setAttribute("type","text")
otherJobRole.setAttribute("id","other-title")
otherJobRole.setAttribute("name","otherJobRole")
otherJobRole.setAttribute("placeholder","Your Job Role")
otherJobRoleLabel.setAttribute('for', "other-title")
otherJobRoleLabel.innerHTML = "Other Job Role"
otherJobRole.style.display = "none"
otherJobRoleLabel.style.display = "none"
document.getElementsByTagName("form")[0].firstElementChild.append(otherJobRoleLabel)
document.getElementsByTagName("form")[0].firstElementChild.append(otherJobRole)

/* jobRoleDropdown event Listener
- triggers on change of the jobRoleDropdown
- if the last option (the 'other option') is selected, then it shows a text input field for the user to provide more detail (and a label)
- otherwise, the input and the label are hidden from view
@EventListener
*/

jobRoleDropdown.addEventListener('change', (e) => {
  if(jobRoleDropdown.lastElementChild.selected == true) {
    otherJobRole.style.display = "";
    otherJobRoleLabel.style.display = "";
  } else {
    otherJobRole.style.display = "none";
    otherJobRoleLabel.style.display = "none";
  }
});

/* T-Shirt Info section
- designThemeSelector is the select element with theme options
- colorSeelctor is the select element with color options
- a message is stored asking the user to select a theme, and added to a new option called noColorOption
- noColorOption is disabled because it's not selectable, just an indication to the user to do something
- noColorOption is the default selection because no t-shirt theme is selected on page load
- appends the noColor as a child of colorSelection
*/

const designThemeSelector = document.getElementById("design")
const colorSelector = document.getElementById("color")
const noThemeMessage = "Please select a T-shirt theme"
const noColorOption = document.createElement("option")
noColorOption.disabled = true;
noColorOption.selected = "selected"
noColorOption.textContent = "Please select a T-shirt theme"
noColorOption.style.display = "none"
colorSelector.insertBefore(noColorOption,colorSelector.firstElementChild)

/* switchColorOptions()
- sets the noColorOption to select by default before running a switch (which whipes old user selections)
- switches on the value of designThemeSelector, displaying only colorOptions associated with the relevant theme
- hides the color option selector entirely if no theme is selected
*/

let switchColorOptions = function() {
  noColorOption.selected = "selected"
  switch(designThemeSelector.value) {
    case "Select Theme":
      //no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”
      for (let i = 0; i < colorSelector.children.length; i += 1) {
        colorSelector.children[i].style.display = "none"
      }
      noColorOption.style.display = ""
      ///Extra Credit Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
      colorSelector.style.display = "none"
      document.getElementById("colors-js-puns").style.display = "none"
      break;
      case "js puns":
        //the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
        for (let i = 0; i < colorSelector.children.length; i += 1) {
          if(colorSelector.children[i].value == "cornflowerblue" || colorSelector.children[i].value == "darkslategrey" || colorSelector.children[i].value == "gold") {
            colorSelector.children[i].style.display = ""
          } else {
            colorSelector.children[i].style.display = "none"
          }
          ///Extra Credit Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
          colorSelector.style.display = ""
          document.getElementById("colors-js-puns").style.display = ""
        }
        break;
      case "heart js":
        //the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
        for (let i = 0; i < colorSelector.children.length; i += 1) {
          if(colorSelector.children[i].value == "tomato" || colorSelector.children[i].value == "steelblue" || colorSelector.children[i].value == "dimgrey") {
            colorSelector.children[i].style.display = ""
          } else {
            colorSelector.children[i].style.display = "none"
          }
          ///Extra Credit Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
          colorSelector.style.display = ""
          document.getElementById("colors-js-puns").style.display = ""
        }
        break;
  }
}

/*designThemeSelector event listener
- triggers on change of the designThemeSelector
- calls for swtichColorOptions to change the options available in the color select element
@event listener
*/

designThemeSelector.addEventListener("change", switchColorOptions);

/*calls swtichColorOptions on page load
- this ensures color options are not available for selection by default until the user makes a design theme selection
*/
switchColorOptions();

/*Register for Activities section
- a checkBoxArray with all the data-day-and-time attributes to determine clashes
- a running total paragraph element to display the cost of activities selected by the user
*/

let checkBoxArray = document.querySelectorAll('[data-day-and-time]')
let runningTotal = document.createElement("p")
document.querySelector('.activities').appendChild(runningTotal);

/* activities event listener
-triggers on change of the activity checkboxes
- if the event bubbled from a check box being selected, clashing activities are disabled
- if the event bubbled from a check box being deselected, clashing activites are reenabled
- calls for the runningtotal (cost of activities) to be updated
- calls for activites to be validated
@EventListener
*/

document.querySelector('.activities').addEventListener("change", (e) => {
  if(e.target.tagName == 'INPUT') {
    if(e.target.checked == true){
      disableClashingActivites(e.target) //calls disableClashingActivites function, passing it the checkbox object
    } else if(e.target.checked == false) {
      enableClashingActivites(e.target) //calls disableClashingActivites function, passing it the checkbox object
    }
    updateRunningTotal()
    validateActivites()
  }
})

/* desableClashingActivites function
disnables activites that clash with a check box (which will be called on selection)
@constructor
param - selection is a checkbox object
*/

function disableClashingActivites(selection) {
  selectedDayAndTime = selection.dataset.dayAndTime
  for (let i = 0; i < checkBoxArray.length; i+=1) {
    // test that the data-day-and-time attribute of i matches that of the selection
    if(checkBoxArray[i].dataset.dayAndTime == selectedDayAndTime){
      // if it perform a second test if the index is the one the customer selected
      if(checkBoxArray[i].parentElement.textContent != selection.parentElement.textContent){
          checkBoxArray[i].disabled = true;
      }
    }
  }
}

/* enableClashingActivites function
enables activites that clash with a check box (which will be called on deselection)
@constructor
param - selection is a checkbox object
*/

function enableClashingActivites(selection) {
  selectedDayAndTime = selection.dataset.dayAndTime
  for (let i = 0; i < checkBoxArray.length; i+=1) {
    if(checkBoxArray[i].dataset.dayAndTime == selectedDayAndTime){
      if(checkBoxArray[i].parentElement.textContent != selection.parentElement.textContent){
        checkBoxArray[i].disabled = false;
      }
    }
  }
}

/* updateRunningTotal()
- calculates the total value of activites selected by the user
- updates a paragraph indiciating to the user what the cost of their selection is
- displays the cost of the selection to the user
*/

function updateRunningTotal() {
  runningTotal.textContent = ''
  let newRunningTotalValue = 0
  for (let i = 0; i < checkBoxArray.length; i+=1) {
    if (checkBoxArray[i].checked == true) {
      newRunningTotalValue += parseInt(checkBoxArray[i].dataset.cost);
    }
  }
  if (document.querySelector(".activities").children[1].firstElementChild.checked == true){ //add in the main conference cost if its checked, because its not part of the check box array
    newRunningTotalValue += parseInt(document.querySelector(".activities").children[1].firstElementChild.dataset.cost)
  }
  if(newRunningTotalValue == 0){
    runningTotal.innerHTML = ''
    runningTotal.style.display = "none"
  } else {
    runningTotal.textContent = `Total cost is $${newRunningTotalValue}`
    runningTotal.style.display = ""
  }
}


/* "Payment Info" section
 - set up the paymentSelector so that the Select Payment option is disabled
 - set up the payment information divs to only display credit card payment information by default
*/

paymentSelector = document.getElementById("payment")
paymentSelector.firstElementChild.disabled = true;
document.getElementById("paypal").style.display = "none"
document.getElementById("bitcoin").style.display = "none"

/* paymentSelector event listener
triggers on change of the paymentSelector and calls selectPaymentDisplay option to change the appropriate payment divs
@EventListener
*/

paymentSelector.addEventListener("change", (e) => {
  selectPaymentDisplay(e.target)
})

/* selectPaymentDisplay()
displays the apporpriate payment infomration based on the payment option selected by the user, to be called by an event handler the paymentSelector
validatesPayments option as selectiong bitcoin or paypal automatically makes payment valid
@constructor
param - option is an option object
*/

function selectPaymentDisplay(option) {
  //hide it all
  document.getElementById("credit-card").style.display = "none"
  document.getElementById("paypal").style.display = "none"
  document.getElementById("bitcoin").style.display = "none"
  //display the appropriate one
  switch(option.value) {
    case "credit card":
      document.getElementById("credit-card").style.display = ""
      validatePayment()
    break;
//When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
    case "paypal":
      document.getElementById("paypal").style.display = ""
      validatePayment()
    break;
//When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
    case "bitcoin":
      document.getElementById("bitcoin").style.display = ""
      validatePayment()
    break;
  }
}

/*
Kay validation boolean variables
*/

let nameIsValid = false
let emailIsValid = false
let activityIsSelected = false
let creditCardNumberIsValid = false
let creditCardZipIsValid = false
let creditCardCvvIsValid = false
let paymentIsValid = false

/*
Form Submission Error Messages Setup
*/

let errorParagraph = document.createElement("p")
let errorUl = document.createElement("ul")
let errorListName = document.createElement("li")
let errorListEmail = document.createElement("li")
let errorListActivity = document.createElement("li")
let errorListCreditCard = document.createElement("li")
errorParagraph.textContent = "You are missing some information, or have inputted information incorrectly. Please fix the below..."
errorListName.textContent = "The name you've entered is invalid or wasn't supplied"
errorListEmail.textContent = "The email you've entered is invalid or wasn't supplied"
errorListActivity.textContent = "You didn't select an activity"
errorListCreditCard.textContent = "The credit card information you selected was invalid or incomplete"
errorParagraph.style.display = "none"
errorListName.style.display = "none"
errorListEmail.style.display = "none"
errorListActivity.style.display = "none"
errorListCreditCard.style.display = "none"
errorParagraph.style.color = "red"
errorListName.style.color = "red"
errorListEmail.style.color = "red"
errorListActivity.style.color = "red"
errorListCreditCard.style.color = "red"
document.querySelector("form").appendChild(errorParagraph)
document.querySelector("form").appendChild(errorUl)
errorUl.appendChild(errorListName)
errorUl.appendChild(errorListEmail)
errorUl.appendChild(errorListActivity)
errorUl.appendChild(errorListCreditCard)

/*
Submission event handler
- prevents default submission behaviour
- validates the overall payment option
- resets form error messages
- submits the form if everything is valid
*/

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); //prevent the submissions default behaviour and initially hides the error message
  validatePayment(); // determine if payment information is valid (the rest of the validations are handled in real time)
  resetFormErrorMessages();
  if( nameIsValid && emailIsValid && activityIsSelected && paymentIsValid) {
    document.querySelector("form").submit(); //if all the validations are true, go ahead and submit
  }
})

/*
resetFormErrorMessages()
- hides all form error messages by default
- displays form error messages depending on fields that are in a valid state
- called on form submssion, and as fields are completed by users (it's used a LOT!!)
*/

function resetFormErrorMessages() {
  errorParagraph.style.display = "none"
  errorListName.style.display = "none"
  errorListEmail.style.display = "none"
  errorListActivity.style.display = "none"
  errorListCreditCard.style.display = "none"
  if(!nameIsValid || !emailIsValid || !activityIsSelected || !paymentIsValid) {
    errorParagraph.style.display = "" //display the general error message
  }
  if (!nameIsValid) {
    errorListName.style.display = "" //display the name validation error messages
  }
  if (!emailIsValid) {
    errorListEmail.style.display = "" //display the email  validation error messages
  }
  if (!activityIsSelected) {
    errorListActivity.style.display = "" //display the actvitiy validation error messages
  }
  if (!paymentIsValid) {
    errorListCreditCard.style.display = "" //display the payment validation error messages
  }
}

/*
Name Validation Message Setup
*/

let validationMessageName = document.createElement("span")
validationMessageName.textContent = "Name must have alphabetical letters and at least one spaces"
validationMessageName.style.display = "none"
validationMessageName.style.color = "red"
nameField.insertAdjacentElement("afterend",validationMessageName)
nameField.addEventListener("keyup", validateNameField) //Event Listener on KeyUp creates real-time Error Messages as the user types

/*
validateNameField()
- if the nameField is blank, nameIsValid is set to false but error styling isn't applied
- if the nameField has valid text, nameIsValid is set to true and error styling isn't applied
- if the nameField has errors incorrect, nameIsValid is set to faslse and error styling is applied
*/

function validateNameField() {
  let regex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/; //https://stackoverflow.com/questions/3073850/javascript-regex-test-peoples-name/29037473
  if(nameField.value == ""){
    nameIsValid = false
    resetDefaultStyle(nameField)
    validationMessageName.style.display = "none"
    resetFormErrorMessages()
  }
  else if(regex.test(nameField.value)) {
    nameIsValid = true
    resetDefaultStyle(nameField)
    validationMessageName.style.display = "none"
    resetFormErrorMessages()
  } else {
    nameIsValid = false
    indicateError(nameField)
    validationMessageName.style.display = ""
    resetFormErrorMessages()
  }
}

/*
Email Validation Message Setup
*/

let validationMessageEmail = document.createElement("span")
let emailField = document.getElementById("mail")
validationMessageEmail.textContent = "Email requires an @ symbol"
validationMessageEmail.style.display = "none"
validationMessageEmail.style.color = "red"
emailField.insertAdjacentElement("afterend",validationMessageEmail)
emailField.addEventListener("keyup", validateEmailField) //Event Listener on KeyUp creates real-time Error Messages as the user types

/*
validateNameField()
- if the emailField is blank, emailIsValid is set to false but error styling isn't applied
- if the emailField has valid text, emailIsValid is set to true and error styling isn't applied
- if the emailField has errors incorrect, emailIsValid is set to faslse and error styling is applied
- the emailField error message changes depending on if the user has inputted a '@' into the string or not
*/

function validateEmailField() {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //https://emailregex.com/
  if(emailField.value == ""){
    emailIsValid = false
    resetDefaultStyle(emailField)
    validationMessageEmail.style.display = "none"
    resetFormErrorMessages()
  } else if(regex.test(emailField.value)) {
    emailIsValid = true
    resetDefaultStyle(emailField)
    validationMessageEmail.style.display = "none"
    resetFormErrorMessages()
  } else {
    emailIsValid = false
    indicateError(emailField)
    if(emailField.value.includes('@')){ //Conditional Error Message on the email. After inclusion of an @, the user is prompted to specify their domain
      validationMessageEmail.textContent = "make sure you include your email domain (ending in .com, .net, .org etc)"
    } else {
      validationMessageEmail.textContent = "Email requires an @ symbol"
    }
    validationMessageEmail.style.display = ""
    resetFormErrorMessages()
  }
}

/*
Actvity Validation Message Setup
*/

let validationMessageActvities = document.createElement("span")
let activityList = document.querySelector(".activities")
validationMessageActvities.textContent = "You must select an activity"
validationMessageActvities.style.display = ""
validationMessageActvities.style.color = "red"
activityList.appendChild(validationMessageActvities)


/* Actvity Validation - countSelectedActivites()
- countSelectedActivites() counts the number of checked activity checkboxes
- validateActivites() takes the count from countSelectedActvitites and if there are more than one checked result, then the input is valid
this is set to run whenever the actvities list is changed in the first event handler
*/

function countSelectedActivites() {
  let count = 0
  for (let i = 1 ; i < activityList.children.length - 2; i+=1) { //the legend is the first element in the array, so we'll start the i at 1 instead of 0, and we'll remove two off the end for the running total and error message
    if (activityList.children[i].firstElementChild.checked == true) { //don't know why it cannot read the checked property
      count += 1;
    }
  }
  return count;
}

/* Actvity Validation - validateActivites()
- validateActivites() takes the count from countSelectedActvitites and if there are more than one checked result, then the input is valid
- this is set to run whenever the actvities list is changed in the first event handler
countSelectedActivites() counts the number of checked activity checkboxes
*/

function validateActivites() {
 if (countSelectedActivites() > 0) {
   activityIsSelected = true
   validationMessageActvities.style.display = "none"
   resetFormErrorMessages()
 } else {
   activityIsSelected = false
   validationMessageActvities.style.display = ""
   resetFormErrorMessages()
 }
}

/*
Card Validation Message Setup
*/

let validationMessageCard = document.createElement("span")
let cardDiv = document.getElementById("credit-card").children[0]
validationMessageCard.textContent = "Please enter a number that is between 13 and 16 digits long"
validationMessageCard.style.display = "none"
validationMessageCard.style.color = "red"
cardDiv.appendChild(validationMessageCard)
cardDiv.addEventListener("keyup", validateCard)  //Event Listener on KeyUp creates real-time Error Messages as the user types

/*
validateCard()
- if the cardField (cardDiv.children[1].value) is blank, creditCardNumberIsValid is set to false but error styling isn't applied
- if the cardField (cardDiv.children[1].value) has valid text, creditCardNumberIsValid is set to true and error styling isn't applied
- if the cardField (cardDiv.children[1].value) has errors incorrect, creditCardNumberIsValid is set to faslse and error styling is applied
*/

function validateCard() {
  let regex = /^\d{13,16}$/
  if(cardDiv.children[1].value == ""){
    creditCardNumberIsValid = false
    resetDefaultStyle(cardDiv.children[1])
    validationMessageCard.style.display = "none"
    validatePayment()
    resetFormErrorMessages()
  } else if(regex.test(cardDiv.children[1].value)) {
    creditCardNumberIsValid = true
    resetDefaultStyle(cardDiv.children[1])
    validationMessageCard.style.display = "none"
    validatePayment() //validates payment against the other credit card variables
    resetFormErrorMessages()
  } else {
    creditCardNumberIsValid = false
    indicateError(cardDiv.children[1])
    validationMessageCard.style.display = ""
    validatePayment()
    resetFormErrorMessages()
  }
}

/*
Zip Validation Message Setup
*/

let validationMessageZip = document.createElement("span")
let zipDiv = document.getElementById("credit-card").children[1]
validationMessageZip.textContent = "Your zip number must be 5 digits"
validationMessageZip.style.display = "none"
validationMessageZip.style.color = "red"
zipDiv.appendChild(validationMessageZip)
zipDiv.addEventListener("keyup", validateZip)  //Event Listener on KeyUp creates real-time Error Messages as the user types

/*
validateZip()
- if the zipField (zipDiv.children[1].value) is blank, creditCardZipIsValid is set to false but error styling isn't applied
- if the zipField (zipDiv.children[1].value) has valid text, creditCardZipIsValid is set to true and error styling isn't applied
- if the zipField (zipDiv.children[1].value) has errors incorrect, creditCardZipIsValid is set to faslse and error styling is applied
*/

function validateZip() {
  let regex = /^\d{5}$/
  if(zipDiv.children[1].value == ""){
    creditCardZipIsValid = false
    resetDefaultStyle(zipDiv.children[1])
    validationMessageZip.style.display = "none"
    validatePayment()
    resetFormErrorMessages()
  } else if(regex.test(zipDiv.children[1].value)) {
    creditCardZipIsValid = true
    resetDefaultStyle(zipDiv.children[1])
    validationMessageZip.style.display = "none"
    validatePayment() //validates payment against the other credit card variables
    resetFormErrorMessages()
  } else {
    creditCardZipIsValid = false
    indicateError(zipDiv.children[1])
    validationMessageZip.style.display = ""
    validatePayment()
    resetFormErrorMessages()
  }
}

/*
Cvv Validation Message Setup
*/

let validationMessageCvv = document.createElement("span")
let cvvDiv = document.getElementById("credit-card").children[2]
validationMessageCvv.textContent = "Your CVV number must be 3 digits"
validationMessageCvv.style.display = "none"
validationMessageCvv.style.color = "red"
cvvDiv.appendChild(validationMessageCvv)
cvvDiv.addEventListener("keyup", validateCvv)  //Event Listener on KeyUp creates real-time Error Messages as the user types

/*
validateCvv()
- if the cvvField (cvvDiv.children[1].value) is blank, creditCardCvvIsValid is set to false but error styling isn't applied
- if the cvvField (cvvDiv.children[1].value) has valid text, creditCardCvvIsValid is set to true and error styling isn't applied
- if the cvvField (cvvDiv.children[1].value) has errors incorrect, creditCardCvvIsValid is set to faslse and error styling is applied
*/

function validateCvv() {
  let regex = /^\d{3}$/
  if(cvvDiv.children[1].value == ""){
    creditCardCvvIsValid = false
    resetDefaultStyle(cvvDiv.children[1])
    validationMessageCvv.style.display = "none"
    validatePayment()
    resetFormErrorMessages()
  } else if(regex.test(cvvDiv.children[1].value)) {
    creditCardCvvIsValid = true
    resetDefaultStyle(cvvDiv.children[1])
    validationMessageCvv.style.display = "none"
    validatePayment() //validates payment against the other credit card variables
    resetFormErrorMessages()
  } else {
    creditCardCvvIsValid = false
    indicateError(cvvDiv.children[1])
    validationMessageCvv.style.display = ""
    validatePayment()
    resetFormErrorMessages()
  }
}

/*
validatePayment()
- this function is called in the form submission event handler
- if the credCard is selected and creditCardNumberIsValid && creditCardZipIsValid && creditCardCVVIsValid then paymentIsValid
- if bitCoin or payPal is selected then paymentIsValid
- under all other circumstances paymentIsValid is set to false
*/

function validatePayment() {

  if( paymentSelector.selectedIndex[1] && creditCardNumberIsValid && creditCardZipIsValid && creditCardCVVIsValid) {
    paymentIsValid = true // passes if credit card is selected and all credit card info is
    resetFormErrorMessages()
  }
  else if(paymentSelector.selectedIndex == 2 || paymentSelector.selectedIndex == 3) {
    paymentIsValid = true // passes if either of the other payment options are selected
    resetFormErrorMessages()
  }
  else {
    paymentIsValid = false // fails in all other conditions
    resetFormErrorMessages()
  }
}

/*
 indicateError() changes the styling of fields to indicate that there is an error
 @constructor
 params - field is an object being edited
*/

function indicateError(field) {
  field.style.borderColor = 'red'
  field.style.backgroundColor = "#F6C5C5";
}

/*
 restoreDefaultStyle() changes the styling of fields to indicate that input is correct
 @constructor
 params - field is an object being edited
*/

function resetDefaultStyle(field) {
  field.style.borderColor = "#6f9ddc";
  field.style.backgroundColor = "#e9f6fb";
}
