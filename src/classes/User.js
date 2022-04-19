class User {
  constructor(userObj) {

  }
};


// Should take in a user object (eventually pulled from the customers API)
// Each instance of user should:
// store id
// store name
// store the bookings associated with that user
// for bookings, make a method that takes in all bookings data (from API),
// method will pass in that bookings array and check the userID for each booking
// If the ids match, push that booking into the user's bookings array

export default User;
