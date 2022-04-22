let getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => console.log(error));
}

// This variable will change when a user logs in and gives their unique id
// Will probably have to play with the importing/exporting if I have the event listener in scripts
let user = 1;

let usersPromise = getPromise(`http://localhost:3001/api/v1/customers/${user}`);
let bookingsPromise = getPromise(`http://localhost:3001/api/v1/bookings`);
let roomsPromise = getPromise(`http://localhost:3001/api/v1/rooms`);

let postBooking = (bookingObj) => {
  fetch(bookinUrlHere, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingObj)
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((booking) => {
    console.log(booking)
    // will have to use this response to get the id and figure out what to do from there
    // just want to view it for now, before deciding how to procede
  })
  .catch((error) => {
    console.log('ERROR');
    // query select where my error message will appear,
    // change the error message inner text
    // return that selected element?
  })
};



export {usersPromise, bookingsPromise, roomsPromise, postBooking};
