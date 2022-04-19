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

    expect(user1.bookings).to.deep.equal([]);

    user1.addBookings(bookings);
    expect(user1.bookings[0]).to.deep.equal(bookings[0]);

    expect(user2.bookings).to.deep.equal([]);

    user2.addBookings(bookings);
    expect(user2.bookings[0]).to.deep.equal(bookings[1]);
    expect(user2.bookings[1]).to.deep.equal(bookings[2]);
  });

  it('each user should be able to keep track of the total amount of money they have spent on rooms', () => {

    expect(user1.totalSpent).to.equal(0);

    user1.addBookings(bookings);
    user1.calculateTotalSpent(rooms);

    expect(user1.totalSpent).to.equal(172.09);

    expect(user2.totalSpent).to.equal(0);

    user2.addBookings(bookings);
    user2.calculateTotalSpent(rooms);

    expect(user2.totalSpent).to.equal(871.08);
  });

});
