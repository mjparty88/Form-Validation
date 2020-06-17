/*Set focus on the first text field
When the page first loads, the first text field should be in focus by default.
*/

let nameField = document.getElementById('name');
nameField.focus();

/*”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
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
//make them invisible
otherJobRole.style.display = "none"
otherJobRoleLabel.style.display = "none"
//input them into the DOM
document.getElementsByTagName("form")[0].firstElementChild.append(otherJobRoleLabel)
document.getElementsByTagName("form")[0].firstElementChild.append(otherJobRole)
//add an event listener to the select element to listen for change.
//If the 'other' option is selected (the last child), then the fields display, otherwise they stay hidden
jobRoleDropdown.addEventListener('change', (e) => {
  if(jobRoleDropdown.lastElementChild.selected == true) {
    otherJobRole.style.display = "";
    otherJobRoleLabel.style.display = "";
  } else {
    otherJobRole.style.display = "none";
    otherJobRoleLabel.style.display = "none";
  }
});

/* ”T-Shirt Info” section
Project Warm Up: Select and option elements are commonly found on web forms, but can be confusing to work with. For some helpful practice, check out the project Warm Up Selects and Options.
Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated.
*/

const designThemeSelector = document.getElementById("design")
const colorSelector = document.getElementById("color")
const noThemeMessage = "Please select a T-shirt theme"
const noColorOption = document.createElement("option")
//i've made the noColorOption element disabled because it's not a genuine selectable option
noColorOption.disabled = true;
//set up the noColorOption to be the default selected option
noColorOption.selected = "selected"
noColorOption.textContent = "Please select a T-shirt theme"
noColorOption.style.display = "none"
colorSelector.insertBefore(noColorOption,colorSelector.firstElementChild)
let switchColorOptions = function() {
  //doesn't matter what the switch does - the noColorOption should also be the default, to prevent an item being selected, the user changing theme, and their old invalid choice persisting
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
//assign switchColorOptions to an event handler on the designThemeSelector
designThemeSelector.addEventListener("change", switchColorOptions);
//calling switchColorOptions on initial document load
switchColorOptions();



/*”Register for Activities” section
If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

let checkBoxArray = document.querySelectorAll('[data-day-and-time]')
let runningTotal = document.createElement("p")
document.querySelector('.activities').appendChild(runningTotal);

document.querySelector('.activities').addEventListener("change", (e) => {
  if(e.target.tagName == 'INPUT') {
    if(e.target.checked == true){
    disableClashingActivites(e.target) //calls disableClashingActivites function, passing it the checkbox object
  } else if(e.target.checked == false) {
    enableClashingActivites(e.target) //calls disableClashingActivites function, passing it the checkbox object
    }
    updateRunningTotal();
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

function updateRunningTotal() {
  runningTotal.textContent = ''
  let newRunningTotalValue = 0
  for (let i = 0; i < checkBoxArray.length; i+=1) {
    if (checkBoxArray[i].checked == true) {
      newRunningTotalValue += parseInt(checkBoxArray[i].dataset.cost);
    }
  }
  //add in the main conference cost if its checked, because its not part of the check box array
  if (document.querySelector(".activities").children[1].firstElementChild.checked == true){
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


*/

//The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.
paymentSelector = document.getElementById("payment")
paymentSelector.firstElementChild.disabled = true;

//The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
document.getElementById("paypal").style.display = "none"
document.getElementById("bitcoin").style.display = "none"
paymentSelector.addEventListener("change", (e) => {
  selectPaymentDisplay(e.target)
})

/* selectPaymentDisplay function
displays the apporpriate payment infomration based on the payment option selected by the user, to be called by an event handler the paymentSelector
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
    break;
//When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
    case "paypal":
      document.getElementById("paypal").style.display = ""
    break;
//When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
    case "bitcoin":
      document.getElementById("bitcoin").style.display = ""
    break;
  }
}


//Form validation




//Form validation messages


//Extra Credit Conditional Error Message

//Real-time Error Messages





//Form works without JavaScript - Progressive Enhancement





//CSS styles






//Add good code comments
