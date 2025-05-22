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


        // Smooth scrolling code...
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });


        // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
  
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


        // Booking form submission
    const bookingForm = document.getElementById('booking-form');

    // In the booking form submission handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                showAuthModal();
                return;
            }
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Add user information
            data.fullname = currentUser.name;
            data.email = currentUser.email;
            
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const editIndex = formData.get('edit-index');
            
            // Validate required fields
            if (!data.service || !data.date || !data.time) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (editIndex !== null && editIndex !== undefined) {
                // Update existing booking
                const existingId = bookings[editIndex].bookingId;
                data.bookingId = existingId; // Preserve the original ID
                bookings[editIndex] = data;
                
                // Show success message and refresh
                alert('Booking updated successfully!');
                
                // Reset form first
                resetBookingForm();
                
                // Then refresh the booking modal if it's open
                if (bookingModal.classList.contains('active')) {
                    showBookingDetails();
                }
            } else {
                // Create new booking
                data.bookingId = Date.now();
                bookings.push(data);
                alert('Thank you for your booking! We will contact you shortly to confirm your appointment.');
                this.reset();
            }
            
            localStorage.setItem('bookings', JSON.stringify(bookings));
        });
    }


        // Add this event listener with your other event listeners
    checkBookingBtn.addEventListener('click', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            showAuthModal();
        } else {
            showBookingDetails();
        }
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && document.getElementById('bookingUserName')) {
        document.getElementById('bookingUserName').textContent = currentUser.name;
    }


    // ====== FUNCTIONS ===== ====== FUNCTIONS ===== ====== FUNCTIONS ===== ====== FUNCTIONS ===== 

    // Modal Functions
    function showAuthModal() {
        document.body.style.overflow = 'hidden';
        blurOverlay.classList.add('active');
        authModal.classList.add('active');
    }

    function hideAuthModal() {
        document.body.style.overflow = '';
        blurOverlay.classList.remove('active');
        authModal.classList.remove('active');
    }

    // Auth Functions
    function handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            successfulLogin(user.name);
        } else {
            alert('Invalid credentials');
        }
    }

    function handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(u => u.email === email)) {
            alert('Email already exists');
            return;
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        successfulLogin(name);
    }

    function successfulLogin(name) {
        // Update UI
        authBtn.textContent = 'Logout';
        document.body.classList.add('logged-in');
        
        // Close modal and clear fields
        setTimeout(() => {
            hideAuthModal();
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            document.getElementById('signupName').value = '';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
        }, 500);
    }
       
    function handleLogout() {
        localStorage.removeItem('currentUser');
        document.body.classList.remove('logged-in');
        authBtn.textContent = 'Login';
    }

    // In checkLoginStatus() - REPLACE with:
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            authBtn.textContent = 'Logout';
            document.body.classList.add('logged-in');
        }
    }
    });


