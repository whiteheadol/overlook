class Hotel {
  constructor(bookings, rooms) {
    this.allBookings = bookings;
    this.allRooms = rooms;
    this.roomsAvailByDate = [];
    this.roomsAvailByType = [];
  };

  checkForRoomsByDate(dateInput){
    let roomsBookedOnDay = [];
    let allRoomNums = [];
    let notAvailOnDate = [];
    let availOnDate = [];

    this.allBookings.forEach(booking => {
      if (booking.date === dateInput) {
        roomsBookedOnDay.push(booking);
      };
    });

    this.allRooms.forEach(room => {
      allRoomNums.push(room.number);
    });

    console.log(roomsBookedOnDay);

    roomsBookedOnDay.forEach(booking => {
      if (!notAvailOnDate.includes(booking.roomNumber)) {
        notAvailOnDate.push(booking.roomNumber);
      }
    })

    console.log('not: ', notAvailOnDate);

    // filter through all room numbers, if not in notAvailOnDate, push to availOnDate
    // Iterate through availOnDate and rooms - push the room with that num into available rooms
    // Make this an instance of room?
  };

  // Build out method to take in a date arg and check to see
  // which room numbers are not booked for that day
  // format of date arg: 2022-05-25
};

export default Hotel;
