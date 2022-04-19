import chai from 'chai';
const expect = chai.expect;
import User from '../src/classes/User';
import {customers} from './data';

describe('User', () => {
  let user1;

  beforeEach(() => {
    user1 = new User(customers[0]);
  });

  it('should be a function', function() {
    // console.log(customers[0]);
    expect(User).to.be.a('function');
  });


});
