document.addEventListener('DOMContentLoaded', () => {
    const interestCards = document.querySelectorAll('.interest-card');
    const nextButton = document.querySelector('.next-btn');
    const selectedInterests = new Set();

    console.log('Interests page loaded');

    // Handle card selection
    interestCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Card clicked:', card.querySelector('h2').textContent);
            card.classList.toggle('selected');

            if (card.classList.contains('selected')) {
                selectedInterests.add(card.querySelector('h2').textContent);
            } else {
                selectedInterests.delete(card.querySelector('h2').textContent);
            }

            console.log('Selected interests:', [...selectedInterests]);
            // Store selected interests in localStorage
            localStorage.setItem('selectedInterests', JSON.stringify([...selectedInterests]));
        });
    });

    // Handle next button click
    nextButton.addEventListener('click', (e) => {
        console.log('Next button clicked');
        console.log('Selected interests count:', selectedInterests.size);

        e.preventDefault(); // Prevent any default behavior

        if (selectedInterests.size > 0) {
            console.log('Navigating to home page...');
            // Store the interests and redirect to home page
            localStorage.setItem('onboardingComplete', 'true');
            localStorage.setItem('isNewUser', 'false');

            // Force navigation to home page
            try {
                window.location.replace('home.html');
            } catch (error) {
                console.error('Navigation error:', error);
                // Fallback navigation method
                window.location.href = './home.html';
            }
        } else {
            alert('Please select at least one interest to continue');
        }
    });

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
}); 