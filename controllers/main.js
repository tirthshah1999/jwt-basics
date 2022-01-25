// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors");

const login = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new BadRequestError("Please provide email and password");
    }

    //just for demo, normally provided by DB!!!!
    const id = new Date().getDate();

    // try to keep payload small, better experience for user  {payload, secret, options}
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '10d'});
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async(req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = {login, dashboard}