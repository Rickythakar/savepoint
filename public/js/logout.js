const logout = async () => {
    const response = await axios.post('/landing/logout');
    if (response.ok) {
      window.location.replace('/landing');
    } else {
      alert(response.statusText);
    }
  };

document.querySelector('#logout').addEventListener('click', logout);