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

    if (response.ok) {
      console.log("User logged in.");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("hi :)");

  const uName = document.querySelector('#signupUser').value.trim();
  const uEmail = document.querySelector('#signupEmail').value.trim();
  const uPass = document.querySelector('#signupPass').value.trim();

  if (uName && uEmail && uPass) {
    const response = await axios.post('/landing/signup', {
      username: uName,
      email: uEmail,
      password: uPass
    });

    if (response.ok) {
      console.log("User Created")
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



