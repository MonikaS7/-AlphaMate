document.addEventListener('DOMContentLoaded', () => {
    // Get username from localStorage
    const username = localStorage.getItem('username') || 'there';
    const usernameElement = document.querySelector('.username');
    if (usernameElement) {
        usernameElement.textContent = username;
    }

    // Handle Get Started button click
    const getStartedBtn = document.querySelector('.get-started-btn');
    getStartedBtn.addEventListener('click', () => {
        // Redirect to interests page
        window.location.href = 'interests.html';
    });

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
}); 