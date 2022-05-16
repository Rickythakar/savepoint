const logout = async () => {
    const response = await axios.post('/landing/logout');
    if (response) {
      window.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

document.querySelector('.logout').addEventListener('click', logout);