const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
      if(isValid(username)){
          users.push({"username":username,
        "password":password});
        return res.status(200).json({message:"user successfully registered"});
      }
      else{
          return res.status(404).json({message:"User already exist"});
      }

  }
  else
  {
      return res.status(404).json({message:"Unable to register user"})
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
 
  for(let key in books){
      if(books[key].author === author)
      {
          book = books[isbn];
          break;
      }
  }

  return res.send(book)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const author = req.params.title;
 
    for(let key in books){
        if(books[key].title === title)
        {
            book = books[isbn];
            break;
        }
    }
  
    return res.send(book)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const author = req.params.isbn;
  
    return res.send(books[isbn].review);
});

module.exports.general = public_users;
