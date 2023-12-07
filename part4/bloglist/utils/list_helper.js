// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => {
    total += blog.likes;
  });
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    let tempFave = blogs[0];
    blogs.forEach((blog) => {
      if (blog.likes > tempFave.likes) {
        tempFave = blog;
      }
    });
    return { title: tempFave.title, author: tempFave.author, likes: tempFave.likes };
  }
  return null;
};

module.exports = {
  dummy, totalLikes, favoriteBlog,
};
