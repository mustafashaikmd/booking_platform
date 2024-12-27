// JavaScript for Carousel functionality
let index = 0; 
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length; 

// Function to show the current slide based on the index
function showSlide() {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  showSlide();
}

setInterval(nextSlide, 3000);

document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
document.getElementById('prevBtn')?.addEventListener('click', prevSlide);

showSlide();

//Retrieve users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

//Save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Signup Form Submission
document.getElementById('signupForm')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert('All fields are required!');
    return;
  }

  let users = getUsers();
  if (users.some(user => user.email === email)) {
    alert('Email is already registered. Please log in.');
    return;
  }

  users.push({ username, email, password });
  saveUsers(users);
  alert('Registration successful! Please log in.');
  window.location.href = 'login.html';
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Both fields are required!');
    return;
  }

  const users = getUsers();
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid email or password.');
  }
});

// Dashboard: Display current user info
if (document.getElementById('usernameDisplay')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    document.getElementById('usernameDisplay').textContent = currentUser.username;
  } else {
    alert('You are not logged in. Redirecting...');
    window.location.href = 'login.html';
  }
}

// Logout Functionality
document.getElementById('logoutButton')?.addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  alert('Logged out successfully.');
  window.location.href = 'index.html';
});

// Booking Form Submission Handling
document.getElementById('bookingForm')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;

  if (!service || !date) {
    alert('All fields are required!');
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    const bookingsKey = `${currentUser.email}-bookings`;
    const bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];
    bookings.push({ service, date });
    localStorage.setItem(bookingsKey, JSON.stringify(bookings));
    alert(`Successfully booked a ${service} on ${date}.`);
  }
});

// Display Booking History
if (document.getElementById('bookingHistory')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    const bookings = JSON.parse(localStorage.getItem(`${currentUser.email}-bookings`)) || [];
    const bookingList = document.getElementById('bookingHistory');
    bookings.forEach(booking => {
      const listItem = document.createElement('li');
      listItem.textContent = `${booking.service} on ${booking.date}`;
      bookingList.appendChild(listItem);
    });
  } else {
    alert('Please log in to view booking history.');
    window.location.href = 'login.html';
  }
}

// Notification System
function showNotification(message) {
  const notificationList = document.getElementById('notificationList');
  if (notificationList) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    notificationList.appendChild(listItem);
  }
}

showNotification('Flat 20% Discount on Flights');

document.addEventListener('DOMContentLoaded', () => {
  const servicePrices = {
      Hotel: 1500,
      Flight: 2599,
      Car: 15,
  };

  const serviceSelect = document.getElementById('service');
  const priceInput = document.getElementById('price');

  serviceSelect.addEventListener('change', () => {
      const selectedService = serviceSelect.value;
      priceInput.value = `₹${servicePrices[selectedService]}`;
  });

  // Booking form submission
  document.getElementById('bookingForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const service = serviceSelect.value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const price = priceInput.value;

      if (!service || !date || !time) {
          alert('Please fill out all required fields.');
          return;
      }

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          const bookingsKey = `${currentUser.email}-bookings`;
          const bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];
          bookings.push({ service, date, time, price });
          localStorage.setItem(bookingsKey, JSON.stringify(bookings));
          alert(`Successfully booked a ${service} on ${date} at ${time}.`);
      }
  });

  // Payment functionality
  document.getElementById('paymentButton').addEventListener('click', () => {
      const price = priceInput.value;
      if (!price) {
          alert('Please select a service and complete the booking form first.');
          return;
      }
      alert(`Payment of ${price} processed successfully!`);
  });

  // Display booking history
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const bookingHistory = document.getElementById('bookingHistory');
  if (currentUser) {
      const bookings = JSON.parse(localStorage.getItem(`${currentUser.email}-bookings`)) || [];
      bookings.forEach((booking) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${booking.service} on ${booking.date} at ${booking.time} for ${booking.price}`;
          bookingHistory.appendChild(listItem);
      });
  }

  // Logout functionality
  document.getElementById('logoutButton').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      alert('Logged out successfully.');
      window.location.href = 'index.html';
  });
});
