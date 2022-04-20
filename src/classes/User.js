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

export default User;
