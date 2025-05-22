document.addEventListener('DOMContentLoaded', function() {
    // Auth Elements
        const authModal = document.getElementById('authModal');
        const blurOverlay = document.getElementById('blurOverlay');
        const closeModal = document.querySelector('.close-modal');
        const tabBtns = document.querySelectorAll('.tab-btn');
        const authForms = document.querySelectorAll('.auth-form');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const loginSubmit = document.getElementById('loginSubmit');
        const signupSubmit = document.getElementById('signupSubmit');
        const checkBookingBtn = document.getElementById('checkBookingBtn');
        const bookingModal = document.getElementById('bookingModal');
        const bookingDetails = document.getElementById('bookingDetails');
        const bookingClose = document.querySelector('.booking-close');

            let authBtn = document.getElementById('authBtn');
            if (!authBtn) {
                authBtn = document.createElement('button');
                authBtn.className = 'btn auth-btn';
                authBtn.textContent = 'Login';
                authBtn.id = 'authBtn';
                authBtn.style.marginLeft = 'auto';
                document.querySelector('.auth-container').appendChild(authBtn);
            }

            });