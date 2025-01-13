const jwt =require("jsonwebtoken")

console.log(jwt.sign({userId: "67847c5434c81b6060cf97ee", name: "abcxyz", email: "abc1@xyz.com"}, "secret", {expiresIn: '1h'}))