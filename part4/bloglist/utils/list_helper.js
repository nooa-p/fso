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

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const authors = blogs.map((blog) => blog.author);
    const unique = [...new Set(authors)];
    let tempBlogs = 1;
    let tempAuthor = unique[0];
    let blogNumber = 0;
    unique.forEach((author) => {
      blogs.forEach((blog) => {
        if (author === blog.author) {
          blogNumber += 1;
        }
      });
      if (blogNumber > tempBlogs) {
        tempBlogs = blogNumber;
        tempAuthor = author;
      }
      blogNumber = 0;
    });
    return { author: tempAuthor, blogs: tempBlogs };
  }
  return null;
};

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const authors = blogs.map((blog) => blog.author);
    const unique = [...new Set(authors)];
    let tempLikes = blogs[0].likes;
    let tempAuthor = unique[0];
    let likeNumber = 0;
    unique.forEach((author) => {
      blogs.forEach((blog) => {
        if (author === blog.author) {
          likeNumber += blog.likes;
        }
      });
      if (likeNumber > tempLikes) {
        tempLikes = likeNumber;
        tempAuthor = author;
      }
      likeNumber = 0;
    });
    return { author: tempAuthor, likes: tempLikes };
  }
  return null;
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
