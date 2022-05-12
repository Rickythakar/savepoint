const loginSubmit=document.querySelector('#loginBtn');
const signupSubmit=document.querySelector('#signupBtn');


const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("hi :)");
  const emailInput= document.querySelector('#typeEmailX');
  const passInput= document.querySelector('#typePasswordX');
  let uEmail;
  let pass;

  if(emailInput!=null && passInput!=null){
    uEmail = emailInput.value.trim();
    pass = passInput.value.trim();
  }

  if (uEmail && pass) {
    const response = await axios.post('/landing/login', {
      email: uEmail,
      password: pass
    });

    if (response) {
      window.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("hi :)");

  const uName = document.querySelector('#typeUserX').value.trim();
  const uEmail = document.querySelector('#typeEmailX').value.trim();
  const uPass = document.querySelector('#typePasswordX').value.trim();

  if (uName && uEmail && uPass) {
    const response = await axios.post('/landing/signup', {
      username: uName,
      email: uEmail,
      password: uPass
    });
    console.log(response);
    if (response) {
      window.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
};

if(loginSubmit!=null){
  loginSubmit.addEventListener('click', loginFormHandler);
}
if(signupSubmit!=null){
  signupSubmit.addEventListener('click', signupFormHandler);
}



