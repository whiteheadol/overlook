class Room {
  constructor(roomObj) {
    this.number = roomObj.number;
    this.type = roomObj.roomType;
    this.numBeds = roomObj.numBeds;
    this.bedSize = roomObj.bedSize;
    this.bidet = roomObj.bidet;
    this.costPerNight = roomObj.costPerNight;
    this.date = '';
    this.bookingID = '';
  }
};

export default Room;
