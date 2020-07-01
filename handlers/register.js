const Register = require('../models/register')
const Point = require('../models/points')
const bcrypt = require('bcrypt')
const validator = require('validator')

exports.signUp = async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    let registeration = new Register({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })
    
    if(valid(registeration)){
        await Register.find({email: registeration.email}, (err, users) => {
    
            if(err) return
    
            try{
                if(users.length){
                    return res.send('Email already registered!')
                }else{
                    try{
                        const pointStore = new Point({
                            email: registeration.email
                        })
                        pointStore.save()
                        registeration.save()
                        return res.send('Registered Successfully!')
                    }catch(err){
                        return res.send('Error Occured!')
                    }
                }
            }catch(err){
                return res.send('Error Occured!')
            }
        })
    }else{
        res.send('Email not Valid')
    }
}

const valid = function(details){
    const result = validator.isEmail(details.email) ? true : false

    return result 
}
