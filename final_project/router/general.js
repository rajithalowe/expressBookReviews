const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;


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
  const request = axios.get(books);  
 console.log(request);
 request.then(resp =>{
    let bookDetails = resp.data;
    console.log(JSON.stringify(bookDetails,null,4))
 })
  .catch(err=>{
      console.log(err.toString());
  });
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
          book = books[key];
          break;
      }
  }

  return res.send(book)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
 
    for(let key in books){
        if(books[key].title === title)
        {
            book = books[key];
            break;
        }
    }
  
    return res.send(book)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  
    return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
