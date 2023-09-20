const pw = document.querySelector("input[id='pw']");
const pwConfirm = document.querySelector("input[id='confirm-pw']");
const pwRequirementsContainer = document.querySelector(".pw-requirements");

pw.addEventListener("focus", showPwRequirements);
pwConfirm.addEventListener("focus", showPwRequirements);

pw.addEventListener("focusout", hidePwRequirements);
pwConfirm.addEventListener("focusout", hidePwRequirements);

function showPwRequirements(e) {
  if (getComputedStyle(pwRequirementsContainer).visibility === "hidden")
    pwRequirementsContainer.style.visibility = "visible";
}

function hidePwRequirements(e) {
  if (getComputedStyle(pwRequirementsContainer).visibility === "visible")
    pwRequirementsContainer.style.visibility = "hidden";
}

let pwRequirements = document.querySelectorAll(".pw-requirements p");
pw.addEventListener("input", checkRequirements);
pwConfirm.addEventListener("input", checkPasswordMatch);

function checkRequirements(e) {
  let password = e.target.value;
  const hasCharacterLength = /^.{6,20}$/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasNumber = /[0-9]/;

  hasCharacterLength.test(password)
    ? showCheck(pwRequirements[1])
    : showCross(pwRequirements[1]);
  hasLowercase.test(password)
    ? showCheck(pwRequirements[2])
    : showCross(pwRequirements[2]);
  hasUppercase.test(password)
    ? showCheck(pwRequirements[3])
    : showCross(pwRequirements[3]);
  hasNumber.test(password)
    ? showCheck(pwRequirements[4])
    : showCross(pwRequirements[4]);
}

function showCheck(element) {
  element.setAttribute("data-before", "✔ ");
  element.style.setProperty("--before-element-color", "seagreen");
}

function showCross(element) {
  element.setAttribute("data-before", "✖ ");
  element.style.setProperty("--before-element-color", "firebrick");
}

function checkPasswordMatch() {
  if (pwConfirm.value === pw.value) {
    pwConfirm.setCustomValidity("");
  } else {
    pwConfirm.setCustomValidity("Passwords don't match!");
  }
}
