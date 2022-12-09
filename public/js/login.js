const logIn = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (user_name && password) {
    const response = await fetch('/api.user/login', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
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

  const user_name = document.querySelector('#new-username').value.trim();
  const email = document.querySelector('#new-email').value.trim();
  const password = document.querySelector('#new-password').value.trim();

  if (user_name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ user_name, email, password }),
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
