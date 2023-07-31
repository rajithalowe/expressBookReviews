const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let userFound = users.filter((user)=>{
        return user.username === username;
    });
    if(userFound.length > 0){
        return false;    
    }
    else{
        return true;
    }    
    
}

const authenticatedUser = (username,password)=>{
    let validUser = users.filter((user)=>{
        return user.username === username && user.password === password;
    });
    if(validUser.length > 0){
        return true;
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username  = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        return res.status(404).json({message:"Error login in"});
    }

    if(authenticatedUser(username,password)){
        let accessToken = jwt.sign({data:password},'access',{expiresIn:60*60});

        req.session.authorization = {
            accessToken , username
        }

        return res.status(200).json({message:"User successfully logged in"})
    }
    else{
        return res.status(404).json({message:"Login error. please check the username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
   const isbn = req.params.isbn;
   const review = req.query.review;
   const username = req.session.authorization['username'];
 
   

   for(let key in books){
       if(key === isbn){
        found = true
        filteredBook = books[key];
        break;
       }
       else{
           found = false;
       }
    }

if(found == true){
    
    
        filteredBook.reviews={username,review};
        
       res.send(filteredBook);

   
}
   else{
       return res.send("unable to find the book");
   }

       
   
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
