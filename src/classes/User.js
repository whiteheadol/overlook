import Room from "./Room.js";

class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.bookingsIds = [];
    this.bookedRoomsInfo = [];
    this.totalSpent = 0;
  }

  addBookingsIds(bookings) {
    bookings.forEach(reservation => {
      if (reservation.userID === this.id) {
        this.bookingsIds.push(reservation);
      };
    });
  };

  // Test this
  addBookedRoomInfo(rooms) {
    let allRooms = [];
    let bookedRooms = [];

    rooms.forEach(room => {
      allRooms.push(new Room(room));
    });

    this.bookingsIds.forEach(room => {
      allRooms.forEach(room2 => {
        if (room.roomNumber === room2.number) {
          bookedRooms.push(room2);
          room2.date = room.date;
          room2.bookingID = room.id;
        }
      });
    });
    this.bookedRoomsInfo = bookedRooms;
  };

  calculateTotalSpent(rooms) {
    rooms.forEach(room => {
      this.bookingsIds.forEach(booking => {
        if (booking.roomNumber === room.number) {
          this.totalSpent += room.costPerNight;
        };
      });
    });
    this.totalSpent = this.totalSpent.toFixed(2);
    this.totalSpent = Number(this.totalSpent);
  };

};

export default User;
