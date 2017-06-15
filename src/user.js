const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
  //this refers to the instance of the model that we are working on
});
//by calling virtual we tell mongoose that we want to define a virtual field

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  //this === joe
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then( () => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
