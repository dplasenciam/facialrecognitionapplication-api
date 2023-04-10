// TO HASH some password

const password = "abs";

bcrypt.hash(password, null, null, function (err, hash) {
  console.log(hash);
});

// TO CAMPARE "bacon" with a hashed value.. if it's its matched..it will return tru

const hash = "hjhshjhjh";

//Load hash from your password DB

bcrypt.compare("bacon", hash, function (err, res) {
  // res == true
});

bcrypt.compare("veggies", hash, function (err, res) {
  // res = false
});
