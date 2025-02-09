import { default as Notification } from './modules/notification.js';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const repeatPasswordInput = document.getElementById('repeatPassword');
  const submitBtn = document.getElementById('submit');
  const notification = new Notification();

  function validateEmail(input) {
    const inputText = input.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMessage = `
        please enter a valid email address.<br>
        example: <span>username@mailserver.domain</span>
    `;

    if (emailRegex.test(inputText)) {
      input.classList.remove('invalid');
      return true;
    }

    notification.displayError(errorMessage);
    input.classList.add('invalid');
    return false;
  }

  function validatePassword(input) {
    const inputText = input.value;

    const lengthTest = inputText.length >= 8;
    const uppercaseTest = /[A-Z]/.test(inputText);
    const lowercaseTest = /[a-z]/.test(inputText);
    const numberTest = /[0-9]/.test(inputText);
    const symbolTest = /[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\]/.test(inputText);
    const AllTests = lengthTest && uppercaseTest && lowercaseTest && numberTest && symbolTest;

    const errorMessage = `
        please enter a valid password.<br><br>
        your password must meet the following requirements:<br>
        <ul>
            <li>at least 8 characters long</li>
            <li>contain at least one uppercase letter (A-Z)</li>
            <li>contain at least one lowercase letter (a-z)</li>
            <li>contain at least one number (0-9)</li>
            <li>contain at least one special symbol (e.g., @, #, $, %, etc.)</li>
        </ul><br>
        example: <span>T3@mW0rk2025</span>
    `;

    if (AllTests) {
      input.classList.remove('invalid');
      return true;
    }

    notification.displayError(errorMessage, 10000);
    input.classList.add('invalid');
    return false;
  }

  function validateRepeatPassword(input) {
    const inputText = input.value;
    const errorMessage = `passwords do not match. please ensure both passwords are identical`;

    if (inputText === passwordInput.value) {
      input.classList.remove('invalid');
      return true;
    }

    notification.displayError(errorMessage);
    input.classList.add('invalid');
    return false;
  }

  function validateInputs(event) {
    const element = event.target;
    const inputText = element.value;

    // skip if input is empty
    if (inputText === '' || element.tagName.toLowerCase() !== 'input') return;

    // what element is focusout
    if (element === emailInput) validateEmail(element);
    else if (element === passwordInput) validatePassword(element);
    else if (element === repeatPasswordInput) validateRepeatPassword(element);
  }

  function handelRegister(event) {
    event.preventDefault();
    const successMessage = `Welcome <span>${emailInput.value.split('@')[0]}</span>! You've successfully signed up.`;

    if (validateEmail(emailInput) && validatePassword(passwordInput) && validateRepeatPassword(repeatPasswordInput)) {
      notification.displaySuccess(successMessage);
    }
  }

  registerForm.addEventListener('focusout', validateInputs);
  submitBtn.addEventListener('click', handelRegister);
});
