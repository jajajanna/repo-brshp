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

                checkLoginStatus();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
    });

    // Auth button event listener
    authBtn.addEventListener('click', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            handleLogout();
        } else {
            showAuthModal();
        }
    });


        // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tab = btn.dataset.tab;
            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${tab}Form`).classList.add('active');
        });
    });


        // Close modal handlers
    bookingClose.addEventListener('click', closeBookingModal);
    closeModal.addEventListener('click', hideAuthModal);
    
    // Blur overlay click handler
    if (blurOverlay) {
        blurOverlay.addEventListener('click', function() {
            closeBookingModal();
            hideAuthModal();
        });
    }

    // Login handler
    if (loginSubmit) {
        loginSubmit.addEventListener('click', handleLogin);
    }
    
    // Signup handler
    if (signupSubmit) {
        signupSubmit.addEventListener('click', handleSignup);
    }


            });