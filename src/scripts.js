// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');

import {usersPromise, bookingsPromise, roomsPromise} from "./apiCalls";
import User from "./classes/User.js";

// Variables -------------------------------------------------------------------
let usersData;
let bookingsData;
let roomsData;
let currentUser;

// Query Selectors -------------------------------------------------------------
let userSum = document.querySelector('.user-total-spent');
let userName = document.querySelector('.user-name');
let userBookingsThumbnails = document.querySelector('.user-bookings');

// Event Listeners -------------------------------------------------------------
// Revisit once there is a 'login' page to refactor. Will probably want this to run on submission of user information instead of page load
window.onload = () =>{
  loadWindow();
};

// Event Handlers and Functions ------------------------------------------------
const showElement = elements => {
  elements.forEach(element => element.classList.remove("hidden"));
};

const hideElement = elements => {
  elements.forEach(element => element.classList.add("hidden"));
};

const loadWindow = () => {
  Promise.all(
    [
      usersPromise,
      bookingsPromise,
      roomsPromise
    ]
  )
  .then(jsonArray => {
    usersData = jsonArray[0];
    bookingsData = jsonArray[1].bookings;
    roomsData = jsonArray[2].rooms;
    currentUser = new User(usersData);
  })
  .then(result => {
    populateUserBookings(bookingsData);
    updateRoomInfo(roomsData);
    findUserTotalCost(roomsData);
    updateUserSum();
    updateUserName();
    displayBookedThumbnails();
  });
};

const populateUserBookings = (bookings) => {
  currentUser.addBookingsIds(bookingsData);
};

const findUserTotalCost = (rooms) => {
  currentUser.calculateTotalSpent(roomsData);
};

const updateUserSum = () => {
  userSum.innerText = `$${currentUser.totalSpent}`;
};

const updateUserName = () => {
  let name = currentUser.name.split(' ');
  let firstName = name[0];
  firstName = firstName.toLowerCase();
  userName.innerText = firstName;
};

const updateRoomInfo = (rooms) => {
  currentUser.addBookedRoomInfo(rooms);
};

const displayBookedThumbnails = () => {
  let bookingsHTML = "";
  currentUser.bookedRoomsInfo.forEach((booking) => {
    console.log(booking);
    bookingsHTML += `<div class="booking-thumbnail" id=${booking.id}>
                <div class="booking-info">
                <p>room number: ${booking.number}</p>
                <p>date: ${booking.date}</p>
                <p>room type: ${booking.type}</p>
                <p>cost per night: $${booking.costPerNight}</p>
                </div>
                </div>`;
  });
  userBookingsThumbnails.innerHTML = bookingsHTML;
};

// Figure out how to check if the date has already passed and change the opacity of the thumbnail for bookings that have already passed

// Pseudocode for Wednesday:
// Find and fix date & id bug - when displayed on DOM, the dates aren't updating correctly
// The problem is in the user method - I'm not adding them correctly somehow
// Build out functionality for the 'book' button
// Homepage will disappear, calendar information and blank page appear
// Do research on date input in html
// Find a way to capture data from this date input
// Make a div for more thumbnails
// Find a way to filter the data based on the date input value
