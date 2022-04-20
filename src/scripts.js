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
    findUserTotalCost(roomsData);
    // console.log(currentUser);
  });
};

const populateUserBookings = (bookings) => {
  currentUser.addBookings(bookingsData);
};

const findUserTotalCost = (rooms) => {
  currentUser.calculateTotalSpent(roomsData);
};


// Display money on DOM - probably change element a bit
// Display static thumbnails by iterating through users bookings array
// Figure out how to click on thumbnail and show more room information
// Function to update span contents
