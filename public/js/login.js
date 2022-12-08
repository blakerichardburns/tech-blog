const logIn = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (userName && password) {
    const response = await fetch('/api.users/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const signUp = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#new-username').value.trim();
  const email = document.querySelector('#new-email').value.trim();
  const password = document.querySelector('#new-password').value.trim();

  if (userName && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ userName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login-info').addEventListener('submit', logIn);

document.querySelector('.signup-info').addEventListener('submit', signUp);
