let loadError = document.querySelector('.load-error');

let getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => {
    loadError.innerText = 'we\'re so sorry - there was an error loading your data, please try again later';
  });
};


// let usersPromise = getPromise(`http://localhost:3001/api/v1/customers/${findCustomerNum()}`);
let bookingsPromise = getPromise(`http://localhost:3001/api/v1/bookings`);
let roomsPromise = getPromise(`http://localhost:3001/api/v1/rooms`);

let postBooking = (bookingObj) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingObj)
  })
};

export {bookingsPromise, roomsPromise, postBooking, getPromise, loadError};
