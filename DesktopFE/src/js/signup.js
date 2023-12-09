const signupForm = document.getElementById('signupForm');
const loginLink = document.getElementById('loginLink');

signupForm.addEventListener('submit', function (event) {
event.preventDefault();

const name = document.getElementById('name').value;
const phone = document.getElementById('phone').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

    console.log('Signup:', { name, phone, email, password });
});

loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = './LoginLogout.html';
});