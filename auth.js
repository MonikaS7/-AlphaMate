// Mock credentials
const MOCK_CREDENTIALS = {
    username: 'alphamate',
    password: 'password123'
};

document.addEventListener('DOMContentLoaded', () => {
    const authBox = document.querySelector('.auth-box');
    const signupBtn = document.querySelector('.signup-btn');
    const loginLink = document.querySelector('.login-link');

    // Show login form
    function showLoginForm() {
        authBox.innerHTML = `
            <h1>Welcome Back!</h1>
            <p class="subtitle">Continue your learning journey with AlphaMate</p>
            
            <form class="auth-form" id="loginForm">
                <div class="form-group">
                    <input type="text" placeholder="Username" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <button type="submit" class="submit-btn">LOG IN</button>
                <div class="switch-auth">
                    DON'T HAVE AN ACCOUNT? <a href="#" class="switch-link">SIGN UP</a>
                </div>
            </form>
        `;

        // Add event listener to the new form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', handleLogin);

        // Add event listener to switch back to signup
        document.querySelector('.switch-link').addEventListener('click', (e) => {
            e.preventDefault();
            showInitialScreen();
        });
    }

    // Show signup form
    function showSignupForm() {
        authBox.innerHTML = `
            <h1>Create Account</h1>
            <p class="subtitle">Join AlphaMate and start your learning journey</p>
            
            <form class="auth-form" id="signupForm">
                <div class="form-group">
                    <input type="text" placeholder="Username" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Confirm Password" required>
                </div>
                <button type="submit" class="submit-btn">SIGN UP</button>
                <div class="switch-auth">
                    ALREADY HAVE AN ACCOUNT? <a href="#" class="switch-link">LOG IN</a>
                </div>
            </form>
        `;

        // Add event listener to the new form
        const signupForm = document.getElementById('signupForm');
        signupForm.addEventListener('submit', handleSignup);

        // Add event listener to switch to login
        document.querySelector('.switch-link').addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Show initial screen
    function showInitialScreen() {
        authBox.innerHTML = `
            <h1>Welcome to AlphaMate</h1>
            <p class="subtitle">Alpha Mate is a AI based tutor and friend<br>to teach you and learn about you!</p>
            <div class="auth-buttons">
                <button class="signup-btn">SIGN UP</button>
                <div class="login-text">
                    ALREADY HAVE AN ACCOUNT? <a href="#" class="login-link">LOG IN</a>
                </div>
            </div>
        `;

        // Reattach event listeners
        document.querySelector('.signup-btn').addEventListener('click', () => showSignupForm());
        document.querySelector('.login-link').addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Handle login submission
    function handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
            // Successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            window.location.href = 'home.html';
        } else {
            alert('Invalid credentials. Please use username: alphamate, password: password123');
        }
    }

    // Handle signup submission
    function handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // For mock purposes, we'll redirect to interests page for new users
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('isNewUser', 'true');
        window.location.href = 'interests.html';
    }

    // Initial event listeners
    signupBtn.addEventListener('click', () => showSignupForm());
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const isNewUser = localStorage.getItem('isNewUser') === 'true';
        window.location.href = isNewUser ? 'interests.html' : 'home.html';
    }
}); 