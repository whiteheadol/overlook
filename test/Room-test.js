import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
import {customers, bookings, rooms} from './data';

describe('Room', () => {

  let room1, room2;

  beforeEach(() => {
    room1 = new Room(rooms[0]);
    room2 = new Room(rooms[1]);
  });

  it('should be a function', function() {

    expect(Room).to.be.a('function');
  });

  it('should be an instance of User', () => {

    expect(room1).to.be.an.instanceof(Room);
  });

  it('each instance of room should store a room number', () => {

    expect(room1.number).to.equal(12);
    expect(room2.number).to.equal(18);
  });

  it('each instance of room should store a room type', () => {

    expect(room1.type).to.equal('single room');
    expect(room2.type).to.equal('junior suite');
  });

  it('each instance of room should store a room\'s number of beds', () => {

    expect(room1.numBeds).to.equal(2);
    expect(room2.numBeds).to.equal(2);
  });

  it('each instance of room should store a room\'s bed sizes', () => {

    expect(room1.bedSize).to.equal('twin');
    expect(room2.bedSize).to.equal('king');
  });

  it('each instance of room should store whether or not a room has a bidet', () => {

    expect(room1.bidet).to.equal(false);
    expect(room2.bidet).to.equal(false);
  });

  it('each instance of room should store a room\'s cost per night', () => {

    expect(room1.costPerNight).to.equal(172.09);
    expect(room2.costPerNight).to.equal(496.41);
  });

  it('each instance of room should have the ability to store the date that a room was booked, but this should be empty for now', () => {

    expect(room1.date).to.equal('');
    expect(room2.date).to.equal('');
  });

  it('each instance of room should have the ability to store the bookingID of a room, but that should be empty for now', () => {

    expect(room1.bookingID).to.equal('');
    expect(room2.bookingID).to.equal('');
  });

});
