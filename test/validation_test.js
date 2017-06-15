const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    //the code directly above is equivalent to
    //const message = validationResult.errors.name.message;
    //console.log(validationResult);
    assert(message === 'Name is required.');
  });

  it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;

    assert(message === 'Name must be longer than two characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al'});
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters.');
        done();
      });
    });
  });
