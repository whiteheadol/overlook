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
    // console.log('avail', availOnDate);
    this.roomsAvailByDate = availOnDate;
    // this.roomsAvailByDateAndType = availOnDate;
  };

  checkForRoomsByDateAndType(typeInput, dateInput) {
    this.roomsAvailByDateAndType = [];
    let availDateAndType = [];

    this.checkForRoomsByDate(dateInput);
    // console.log('avail on date', this.roomsAvailByDate)

    if (typeInput === 'any') {
      this.roomsAvailByDateAndType = this.roomsAvailByDate;
    } else if (typeInput === 'suite') {
      this.roomsAvailByDate.forEach(room => {
        if (room.roomType === 'suite') {
          availDateAndType.push(room);
          this.roomsAvailByDateAndType = availDateAndType;
        }
      });
    } else if (typeInput === 'junior' || typeInput === 'residential' || typeInput === 'single') {
      console.log('j', typeInput);
      this.roomsAvailByDate.forEach(room => {
        if (room.roomType.includes(typeInput)) {
          availDateAndType.push(room);
          this.roomsAvailByDateAndType = availDateAndType;
        };
      });
      // Come back and account for more error handling here

      // If this.roomsAvailByDateAndType === [];
      // refresh the page to not show the last search, and show error message
    };
  };

// TEST THIS METHOD
// method to take in id number of room just booked
// filter out that room id on roomsAvailByDateAndType
  filterOutRoom(roomNumber) {
    let newArr = this.roomsAvailByDateAndType.filter(room => {
      return room.number !== roomNumber;
    });
    this.roomsAvailByDateAndType = newArr;
  };
};

export default Hotel;
