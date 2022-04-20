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

    expect(hotel.roomsAvailByType).to.deep.equal([]);
  });
});
