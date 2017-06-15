const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: "Joe" });

    joe.save()
      .then(() => {
        //Has Joe been saved successfully?
        assert(!joe.isNew);
        //because joe was actually already saved successfully the isNew flag will bring us false, as joe already exists in the mongo database.
        //in other for us to get true though, because we would prefer to get true if our tests work, we use the ! sign to assert that joe is not a new instance in the User model.
        done();
      });
  });
});
