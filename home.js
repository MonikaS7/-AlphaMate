document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.replace('./index.html');
        return;
    }

    // Handle sign out
    const signOutBtn = document.getElementById('signOutBtn');
    signOutBtn.addEventListener('click', function () {
        // Clear all storage
        localStorage.clear();
        // Redirect to login page
        window.location.replace('./index.html');
    });

    // Update username
    const username = localStorage.getItem('username') || 'User';
    document.querySelector('.username').textContent = username;

    // Set greeting based on time of day
    const hour = new Date().getHours();
    const greeting = document.querySelector('.greeting h1');
    let timeOfDay = 'Good Morning';

    if (hour >= 12 && hour < 17) {
        timeOfDay = 'Good Afternoon';
    } else if (hour >= 17) {
        timeOfDay = 'Good Evening';
    }

    greeting.textContent = `${timeOfDay}, ${username}`;

    // Handle navigation
    const navLinks = document.querySelectorAll('.bottom-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });
}); 