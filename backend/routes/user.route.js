let express = require('express'),
router = express.Router();
let userSchema = require('../Models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
    
    //Our register logic starts here
    try{
        //Get user input
        const {first_name, last_name, email, password} = req.body;

        //Validation user input
        if(!(email && password && first_name && last_name)){
            res.status(400).send("All input is required");
        }

        // check if user already exits
        // Validation if user exist in our database

        const oldUser = await userSchema.findOne({email});

        if(oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password

        let encryptedPassword = await bcrypt.hashSync(password, 10);

        //Create user in our database

        const user = await userSchema.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        //Create token
        const token = jwt.sign({
            user_id: user._id, email
        },'Token',{expiresIn: '2h'});

        //save user token
        user.token = token;

        //return new user
        res.status(201).json(user);
    }catch(err){
        console.log(err);
    }

    // Our register logic ends here
});

//Login
router.post('/login', async (req, res) => {

    // Our login logic starts here 
    try{
        //Get user input 
        const {email, password} = req.body;

        // Validation user input
        if(!(email && password)){
            res.status(400).send("All input is required");
        }

        // Validation if user exist in our database
        const user = await userSchema.findOne({email});

        if(user &&(await bcrypt.compare(password, user.password))){
            // Create Token
            const token = jwt.sign({
                user_id: user._id, email
            },
            'vivek',
            {
                expiresIn: '2h'
            });

            // save user token
            user.token = token;

            //user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }catch (err){
        console.log(err);
    }
    // Our login logic ends here
})

module.exports = router;