const express = require("express");
const router = express.Router();
const administrator = require("../models/administrator");

//password
const bcrypt = require("bcrypt");
//sign up
router.post('/signup', (req, res) => {
  let nombre = req.body.nombre;
  let email = req.body.email;
  let telefono = req.body.telefono;
  let password = req.body.password;
  if (nombre == "" || email == "" || telefono == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!"
    });
  } else if (!/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(nombre)) {
    res.json({
      status: "FAILED",
      message: "Invalid nombre entry"
    })
  } else if (!/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered"
    })
  } else {
    //Checking if user already exists
    administrator.find({ email }).then(result => {
      if (result.length) {
        // A user already exists
        res.json({
          status: "FAILED",
          message: "User with the provided email already exists"
        })
      } else {
        // Try to create new user

        //Password handling
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
          const newAdmin = new administrator({
            nombre,
            email,
            telefono,
            password: hashedPassword,
          });

          newAdmin.save().then(result => {
            res.json({
              status: "SUCCESS",
              message: "Sign up successful!",
              data: result
            })
          })
            .catch(err => {
              res.json({
                status: "FAILED",
                message: "An error occurred while saving user account!"
              })
            })
        })
          .catch(err => {
            res.json({
              status: "FAILED",
              message: "An error occurred while hashing contrasena!"
            })
          })
      }

    }).catch(err => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "An error ocurred while checking for existing user!"
      });
    });



  }


});
//signin
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied"
    });
  } else {
    //Check if the user exist
    administrator
      .find({ email })
      .then((data) => {
        if (data.length) {
          //Administrator exist
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                //Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error ocurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error ocurred while checking for existing administrator",
        });
      });
  }
});

module.exports = router;