import chai from 'chai';
const expect = chai.expect;
import User from '../src/classes/User';
import {customers, bookings, rooms} from './data';

describe('User', () => {
  let user1, user2;

  beforeEach(() => {
    user1 = new User(customers[0]);
    user2 = new User(customers[1]);
  });

  it('should be a function', function() {

    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {

    expect(user1).to.be.an.instanceof(User);
  });

  it('each user instance should store a user id', () => {

    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it('each user instance should store a user name', () => {

    expect(user1.name).to.equal('Leatha Ullrich');
    expect(user2.name).to.equal('Rocio Schuster');
  });

  it('each instance of user should be able to store the user\'s previous and upcoming bookings', () => {

    expect(user1.bookingsIds).to.deep.equal([]);

    user1.addBookingsIds(bookings);
    expect(user1.bookingsIds[0]).to.deep.equal(bookings[0]);

    expect(user2.bookingsIds).to.deep.equal([]);

    user2.addBookingsIds(bookings);
    expect(user2.bookingsIds[0]).to.deep.equal(bookings[1]);
    expect(user2.bookingsIds[1]).to.deep.equal(bookings[2]);
  });

  it('each user should be able to store instances of the room class', () => {

    expect(user1.bookedRoomsInfo).to.deep.equal([]);

    user1.addBookingsIds(bookings);
    user1.addBookedRoomInfo(rooms);

    expect(user1.bookedRoomsInfo[0].number).to.equal(12);
    expect(user1.bookedRoomsInfo[0].type).to.equal('single room');
    expect(user1.bookedRoomsInfo[0].numBeds).to.equal(2);
    expect(user1.bookedRoomsInfo[0].bedSize).to.equal('twin');
    expect(user1.bookedRoomsInfo[0].bidet).to.equal(false);
    expect(user1.bookedRoomsInfo[0].costPerNight).to.equal(172.09);
    expect(user1.bookedRoomsInfo[0].date).to.equal('2022/02/05');
    expect(user1.bookedRoomsInfo[0].bookingID).to.equal('5fwrgu4i7k55hl6t8');
  });

  it('each user should be able to keep track of the total amount of money they have spent on rooms', () => {

    expect(user1.totalSpent).to.equal(0);

    user1.addBookingsIds(bookings);
    user1.calculateTotalSpent(rooms);

    expect(user1.totalSpent).to.equal(172.09);

    expect(user2.totalSpent).to.equal(0);

    user2.addBookingsIds(bookings);
    user2.calculateTotalSpent(rooms);

    expect(user2.totalSpent).to.equal(871.08);
  });

});
