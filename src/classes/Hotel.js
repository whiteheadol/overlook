class Hotel {
  constructor(bookings, rooms) {
    this.allBookings = bookings;
    this.allRooms = rooms;
    this.roomsAvailByDate = [];
    this.roomsAvailByDateAndType = [];
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
    this.roomsAvailByDateAndType = availOnDate;
  };

  checkForRoomsByDateAndType(typeInput, dateInput) {
    let availDateAndType = [];

    if (typeInput === 'any') {
      this.checkForRoomsByDate(dateInput)
    } else if (typeInput === 'suite') {
      this.roomsAvailByDate.forEach(room => {
        if (room.roomType === 'suite') {
          availDateAndType.push(room);
          this.roomsAvailByDateAndType = availDateAndType;
        }
      });
    } else if (typeInput === 'junior' || typeInput === 'residential' || typeInput === 'single') {
      this.roomsAvailByDate.forEach(room => {
        if (room.roomType.includes(typeInput)) {
          availDateAndType.push(room);
          this.roomsAvailByDateAndType = availDateAndType;
        };
      });
    } else {
      console.log('error');
      // Come back and account for more error handling here
    };

  };

};

export default Hotel;
