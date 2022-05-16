const loginSubmit=document.querySelector('#loginBtn');
const signupSubmit=document.querySelector('#signupBtn');


const loginFormHandler = async (event) => {
  event.preventDefault();

  const uEmail= document.querySelector('#typeEmailX').value.trim();
  const uPass= document.querySelector('#typePasswordX').value.trim();
  

  if (uEmail && uPass) {
    const response = await axios.post('/landing/login', {
      email: uEmail,
      password: uPass
    }).then((res)=>{ return res});

    if (response) {
      window.location.replace('/home');
    } else {
      console.log(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const uName = document.querySelector('#typeUserX').value.trim();
  const uEmail = document.querySelector('#typeEmailX').value.trim();
  const uPass = document.querySelector('#typePasswordX').value.trim();

  if (uName && uEmail && uPass) {
    const response = await axios.post('/landing/signup', {
      username: uName,
      email: uEmail,
      password: uPass
    }).then((res)=>{ return res});

    if (response) {
      window.location.replace('/home');
    } else {
      console.log("Wrong email and/or password. Please re-enter.");
    }
  }
};

if(loginSubmit!=null){
  loginSubmit.addEventListener('click', loginFormHandler);
}
if(signupSubmit!=null){
  signupSubmit.addEventListener('click', signupFormHandler);
}



