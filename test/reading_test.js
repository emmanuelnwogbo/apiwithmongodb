const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  beforeEach( (done) => {
    alex = new User({ name: 'Alex'});
    joe = new User({ name: 'Joe'});
    maria = new User({ name: 'Maria'});
    zach = new User({ name: 'Zach'});

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        console.log(users[0]._id);
        console.log(joe._id);
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      //the key of the object inside the sort function will be the property of
      //all of our users that is being sorted. and the value will be the sort order
      //1 here means ascending fashion -1  will be descending fashion
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });
});
