const axios= require("axios");


const logout = async () => {
  const response = await axios.post('/landing/logout');

  if (response.ok) {
    window.location.replace('/landing');
  } else {
    alert(response.statusText);
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  const uEmail = document.querySelector('#email-login').value.trim();
  const pass = document.querySelector('#password-login').value.trim();

  if (uEmail && pass) {
    const response = await axios.post('/login', {
      email: uEmail,
      password: pass
    });

    if (response.ok) {
      console.log("User logged in.");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const uName = document.querySelector('#name-signup').value.trim();
  const uEmail = document.querySelector('#email-signup').value.trim();
  const uPass = document.querySelector('#password-signup').value.trim();

  if (uName && uEmail && uPass) {
    const response = await axios.post('/landing/signup', {
      email: uEmail,
      password: pass
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


document.querySelector('#logout').addEventListener('click', logout);
