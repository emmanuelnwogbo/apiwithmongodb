const assert = require('assert');
const User = require('../src/user');


describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then( () => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    //assertName(joe.save(), done);
    joe.save()
      .then( () => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
    });
  });

  it('A model instance can update', (done) => {
      //assertName(joe.update({ name: 'Alex'}), done);
      joe.update({ name: 'Alex'})
        .then( () => User.find({}))
        .then((users) => {
          assert(users.length === 1);
          assert(users[0].name === 'Alex');
          done();
      });
    });

    it('A model class can update', (done) => {
      assertName(
        User.update({ name: 'Joe'}, { name: 'Alex'}),
      done);
    });

    it('A model class can update one record', (done) => {
      assertName(
        User.findOneAndUpdate({name : 'Joe' }, { name: 'Alex'}),
        done);
    });

    it('A model class can find a recored with an Id and update', (done) =>{
      assertName(
        User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
         done);
    });

    it('A user can have their postcount incremented by 1', (done) => {
      //directly below is how we use update operators
      User.update({name: 'Joe'}, { $inc: { likes: 1}})
      //if you want to decrease a value you can do so by simply
      //passing in a negative number eg -2 instead of 2.
        .then(() => User.findOne({name: 'Joe'}))
        .then((users) => {
          assert(users.likes === 1);
          done();
        });
    });
});

//You can think of using set when you want to update a single property existing on a record
//Update is when you want to update the whole record
