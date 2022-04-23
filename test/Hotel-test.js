import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel';
import {customers, bookings, rooms} from './data';

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(bookings, rooms);
  });

  it('should be a function', function() {

    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {

    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should be able to store all room bookings', () => {

    expect(hotel.allBookings).to.deep.equal(bookings);
  });

  it('should be able to store all individual room information', () => {

    expect(hotel.allRooms).to.deep.equal(rooms);
  });

  it('should be able to store rooms available by a date', () => {

    expect(hotel.roomsAvailByDate).to.deep.equal([]);
  });

  it('should be able to store rooms available by a room type', () => {

    expect(hotel.roomsAvailByDateAndType).to.deep.equal([]);
  });

  it('should be able to check what rooms are available on a certain date and store available rooms in a property', () => {

    hotel.checkForRoomsByDate('2022/01/09');

    expect(hotel.roomsAvailByDate.length).to.equal(2);
    expect(hotel.roomsAvailByDate[0]).to.equal(rooms[0]);
    expect(hotel.roomsAvailByDate[1]).to.equal(rooms[2]);
  });

  it('should be able to check what rooms are available on a certain date and any type', () => {

    hotel.checkForRoomsByDate('2022/01/09');
    hotel.checkForRoomsByDateAndType('any', '2022/01/09');

    expect(hotel.roomsAvailByDateAndType.length).to.equal(2);
    expect(hotel.roomsAvailByDateAndType[0]).to.equal(rooms[0]);
    expect(hotel.roomsAvailByDateAndType[1]).to.equal(rooms[2]);
  });

  it('should be able to check what rooms are available on a certain date and of a certain type', () => {

    hotel.checkForRoomsByDate('2022/01/09');
    hotel.checkForRoomsByDateAndType('single', '2022/01/09');

    expect(hotel.roomsAvailByDateAndType.length).to.equal(1);
    expect(hotel.roomsAvailByDateAndType[0]).to.equal(rooms[0]);
  });

  it('should not add rooms if they do not meet both criteria', () => {

    hotel.checkForRoomsByDate('2022/01/09');
    hotel.checkForRoomsByDateAndType('potato', '2022/01/09');

    expect(hotel.roomsAvailByDateAndType.length).to.equal(0);
    expect(hotel.roomsAvailByDateAndType).to.deep.equal([]);
  });

  it('should be able to manually remove a room from the array of rooms available', () => {

    hotel.checkForRoomsByDate('2022/01/09');
    hotel.checkForRoomsByDateAndType('single', '2022/01/09');
    hotel.filterOutRoom(12);

    expect(hotel.roomsAvailByDateAndType.length).to.equal(0);
    expect(hotel.roomsAvailByDateAndType).to.deep.equal([]);
  });

});
