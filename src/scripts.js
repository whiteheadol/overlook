import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import {bookingsPromise, roomsPromise, postBooking, getPromise} from "./apiCalls";
import User from "./classes/User.js";
import Hotel from "./classes/Hotel.js";

// Variables -------------------------------------------------------------------
let usersData;
let bookingsData;
let roomsData;
let currentUser;
let currentHotel;
let roomNumber;
// let userNum = 1;

// Query Selectors -------------------------------------------------------------
let userSum = document.querySelector('.user-total-spent');
let userMoney = document.querySelector('.user-money');
let userName = document.querySelector('.user-name');
let userBookingsThumbnails = document.querySelector('.user-bookings');
let bookPageButton = document.querySelector('.book-page-button');
let homePageButton = document.querySelector('.home-page-button');
let homePage = document.querySelector('.homepage');
let bookPage = document.querySelector('.book-page');
let greeting = document.querySelector('.greeting');
let searchFields = document.querySelector('.search-fields');
let dateInput = document.querySelector('input[type="date"]');
let filterButton = document.querySelector('.filter-button');
let possibleBookings = document.querySelector('.possible-bookings');
let emptySearchMessage = document.querySelector('.filter-subheading');
let followUp = document.querySelector('.followup');
let errorMessage = document.querySelector('.error');
let loginButton = document.querySelector('.login');
let username = document.querySelector('.username');
let password = document.querySelector('.password');
let userError = document.querySelector('.user-error');

// Event Listeners -------------------------------------------------------------
// Revisit once there is a 'login' page to refactor. Will probably want this to run on submission of user information instead of page load
// window.onload = () =>{
//   loadWindow();
// };

bookPageButton.addEventListener('click', function() {
  findRoomsAvail();
  toggleBookPage();
  emptySearchMessage.innerText = '';
  followUp.innerText = '';
});

homePageButton.addEventListener('click', function() {
  updateUserSum();
  updateUserName();
  displayBookedThumbnails();
  hideElement([bookPage, homePageButton, searchFields]);
  showElement([homePage, bookPageButton, greeting, userMoney]);
});

filterButton.addEventListener('click', function() {
  event.preventDefault();
  findRoomsAvail();
  displayPossibleBookings();
});

possibleBookings.addEventListener('click', function(e) {
  event.preventDefault();
  if (e.target.classList.contains('book-button')) {
    updateBookingText(e.target.id);
    postToBookings(e.target.id);
  };
});

loginButton.addEventListener('click', function() {
  checkLogin();
  loadWindow();
});

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
      // usersPromise,
      getPromise(`http://localhost:3001/api/v1/customers/${findCustomerNum()}`),
      bookingsPromise,
      roomsPromise
    ]
  )
  .then(jsonArray => {
    usersData = jsonArray[0];
    bookingsData = jsonArray[1].bookings;
    roomsData = jsonArray[2].rooms;
    currentUser = new User(usersData);
    currentHotel = new Hotel(bookingsData, roomsData);
  })
  .then(result => {
    // populateUserBookings(bookingsData);
    // updateRoomInfo(roomsData);
    // findUserTotalCost(roomsData);
    // updateUserSum();
    // updateUserName();
    // displayBookedThumbnails();
    console.log(currentUser);
  });
};

const populateUserBookings = (bookings) => {
  currentUser.addBookingsIds(bookingsData);
  currentUser.addBookedRoomInfo(roomsData);
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
  // currentUser.addBookedRoomInfo(roomsData);
  let bookingsHTML = "";
  currentUser.bookedRoomsInfo.forEach((booking) => {
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

const toggleBookPage = () => {
  hideElement([bookPageButton, homePage, userMoney, greeting]);
  showElement([homePageButton, bookPage, searchFields]);
};

const findRoomsAvail = () => {
  let date = dateInput.value;
  date = date.split('-');
  date = date.join('/');
  let type = document.querySelector('#select1');
  type = type.value;
  currentHotel.checkForRoomsByDateAndType(type, date);
  displayPossibleBookings();
};

const displayPossibleBookings = () => {
  emptySearchMessage.innerText = '';
  followUp.innerText = '';
  let bookingsHTML = '';
  currentHotel.roomsAvailByDateAndType.forEach((room) => {
    bookingsHTML += `<div class="to-book-thumbnail">
                <div class="to-book-info room${room.number}" id=${room.number}>
                <p>room number: ${room.number}</p>
                <p>room type: ${room.roomType}</p>
                <p>number of beds: ${room.numBeds}</p>
                <p>bed size: ${room.bedSize}</p>
                <p>bidet: ${room.bidet}</p>
                <p>cost per night: $${room.costPerNight}</p>
                </div>
                <button class="book-button" id="btn${room.number}">book now</button>
                </div>`;
  });

  possibleBookings.innerHTML = bookingsHTML;

  if (currentHotel.roomsAvailByDateAndType.length === 0) {
    emptySearchMessage.innerText = 'we apologize - there are no rooms that match your current search';
    followUp.innerText = 'please change your seach parameters and try again!';
  };
};

const findIdHelper = (id) => {
  let newId = id.split('');
  let idToPass = newId.reduce((acc, letter) => {
    if (letter !== 'b' && letter !== 't' && letter !== 'n') {
      acc.push(letter);
    }
    return acc;
  }, []);
  let finalId = idToPass.join('');
  return finalId;
};

const updateBookingText = (id) => {
  let newId = findIdHelper(id);
  let textToChange = document.getElementById(`${newId}`);
  textToChange.innerHTML += `<p class="booked">you've booked this room!</p>`;

  // console.log(currentUser);
  let currentButton = document.getElementById(`${id}`)
  hideElement([currentButton]);

  // Would then invoke the post function here
  // Update the current user by adding this instance of booking to their bookedRoomsInfo array
    // push a new instance with number, bedsize, bidet, bookingID, constPerNight, date, numBeds, type
    // Could look like making an object, making a new instance of room with this object, then adding the correct data and an ID

    // Rerun the methods to update rooms available by date and type?
  // Set time out to refresh booking page?
};

const postToBookings = (id) => {
  let date = dateInput.value;
  date = date.split('-');
  date = date.join('/');
  roomNumber = findIdHelper(id);
  roomNumber = Number(roomNumber);
  let obj = { "userID": currentUser.id, "date": date, "roomNumber": roomNumber };

  postBooking(obj).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((booking) => {
    errorMessage.innerText = '';
    getPromise(`http://localhost:3001/api/v1/bookings`)
    .then(jsonArray => {
      bookingsData = jsonArray.bookings;
      currentHotel = new Hotel(bookingsData, roomsData);
      populateUserBookings(bookingsData);
      updateRoomInfo(roomsData);
      findUserTotalCost(roomsData);
    })
    .catch(error => {
      errorMessage.innerText = 'we\'re sorry - there was a problem booking your room';
    })
  });
};

const checkLogin = () => {
  console.log('clicked');
  findCorrectUsername();
  // Function to see what value of username is,
  // if customer 1-50, reassign customer value and export that variable
  // if manager, do nothing for now
  // if invalid, show error message
  // Function to see if password is correct
};

const findCorrectUsername = () => {
  console.log(username.value);

  if (username.value.includes('customer')) {
    console.log('yep!');
    // function to find which customer
    findCustomerNum();
    // console.log(currentUser);
  } else if (username.value.includes('manager')) {
    console.log('man');
  } else {
    console.log('add error handling');
  }
};

const findCustomerNum = () => {
  let userNum = username.value;
  userNum = userNum.split('');
  userNum.splice(0, 8);

  if (userNum[0] === '0') {
    userNum.splice(0, 1)
  }

  userNum = userNum.join('');

  if (userNum > 0 && userNum < 51) {
    userError.innerText = '';
    return userNum;
  } else {
    userError.innerText = 'please enter a valid username and password';
  }
};

// If userName and password are valid - then fetch




// On the home page: Figure out how to check if the booking date has already passed and change the opacity of the thumbnail for bookings that HAVE already passed
