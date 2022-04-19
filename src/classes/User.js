class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.bookings = [];
    this.totalSpent = 0;
  }

  addBookings(bookings) {
    bookings.forEach(reservation => {
      if (reservation.userID === this.id) {
        this.bookings.push(reservation);
      };
    });
  };

  calculateTotalSpent(rooms) {
    rooms.forEach(room => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          this.totalSpent += room.costPerNight;
        }
      })
    })
  };

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
