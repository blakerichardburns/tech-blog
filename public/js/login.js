const loginIn = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        
        const response = await fetch('/api.users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
    }
};

const signUp = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#user-name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userName && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ userName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-info')
    .addEventListener('submit', loginIn);

document
    .querySelector('.signup-info')
    .addEventListener('submit', signUp);