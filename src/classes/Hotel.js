class Hotel {
  constructor(bookings, rooms) {
    this.allBookings = bookings;
    this.allRooms = rooms;
    this.roomsAvailByDate = [];
    this.roomsAvailByType = [];
  };

  checkForRoomsByDate(dateInput){
    let roomsBookedOnDay = [];
    let notAvailOnDate = [];
    let availOnDate = [];

    this.allBookings.forEach(booking => {
      if (booking.date === dateInput) {
        roomsBookedOnDay.push(booking);
      };
    });

    roomsBookedOnDay.forEach(booking => {
      if (!notAvailOnDate.includes(booking.roomNumber)) {
        notAvailOnDate.push(booking.roomNumber);
      };
    });

    this.allRooms.forEach(room => {
      if (!notAvailOnDate.includes(room.number)) {
        availOnDate.push(room);
      };
    });

    this.roomsAvailByDate = availOnDate;
  };



};

export default Hotel;
