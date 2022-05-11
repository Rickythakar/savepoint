const axios= require("axios");
const loginSubmit=document.querySelector('#loginBtn');
const signupSubmit=document.querySelector('#');

const loginFormHandler = async (event) => {
  event.preventDefault();
  const uEmail = document.querySelector('#typeEmailX').value.trim();
  const pass = document.querySelector('#typePasswordX').value.trim();

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

  const uName = document.querySelector('#').value.trim();
  const uEmail = document.querySelector('#').value.trim();
  const uPass = document.querySelector('#').value.trim();

  if (uName && uEmail && uPass) {
    const response = await axios.post('/landing/signup', {
      username: uName,
      email: uEmail,
      password: uPass
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

loginSubmit.addEventListener('submit', loginFormHandler);

signupSubmit.addEventListener('submit', signupFormHandler);
