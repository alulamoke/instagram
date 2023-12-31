const Post = require('../models/post.model');

module.exports.dataFilters = async (post, userId, type = 'multiple') => {
  let userLikedPost = false;
  let userReportedPost = false;
  let userTotalPost;

  if (type !== 'single') {
    userTotalPost = await Post.find({
      user: post.user._id || post._id,
    }).countDocuments();
  }

  if (post.likes.includes(userId)) {
    userLikedPost = true;
  } else if (post.reports.includes(userId)) {
    userReportedPost = true;
  }
  return { userLikedPost, userReportedPost, userTotalPost };
};

module.exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (data.name !== '') userDetails.name = data.name;
  if (data.email !== '') userDetails.email = data.email;
  if (data.username !== '') userDetails.username = data.username;
  if (data.bio !== '') userDetails.bio = data.bio;
  if (data.website !== '') {
    if (data.website.substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website}`;
    } else userDetails.website = data.website;
  }
  if (data.gender !== '') userDetails.gender = data.gender;
  if (data.phone !== '') userDetails.phone = data.phone;

  return userDetails;
};
