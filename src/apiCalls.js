let getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => console.log(error));
}

// This variable will change when a user logs in and gives their unique id
let user = 1;

let usersPromise = getPromise(`http://localhost:3001/api/v1/customers/${user}`);
let bookingsPromise = getPromise(`http://localhost:3001/api/v1/bookings`);
let roomsPromise = getPromise(`http://localhost:3001/api/v1/rooms`);





export {usersPromise, bookingsPromise, roomsPromise};
