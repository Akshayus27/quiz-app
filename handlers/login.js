const Point = require('../models/points')
const Register = require('../models/register')
const bcrypt = require('bcrypt');

exports.getIn = async function(req, res){

    await Register.find({email: req.body.email}, (err, users) => {
        
        if(err) return res.senStatus(401)
        
        const user = users ? users[0] : []
       if(user){
        try{
            if(bcrypt.compareSync(req.body.password, user.password)){
               const getPoint = async () => { 
                 await Point.find({email: user.email}, (err, points) => {
                    if(err) return res.sendStatus(401)
            
                    const point = points ? points[0] : []
                    if(point) return res.send(point)
                })
              }
              getPoint()
            }else{
              return res.sendStatus(401)
             }
          }catch(err){
              return res.sendStatus(401)
          }
       }else{
           return res.sendStatus(401)
       }

    })
}

exports.pointUpdate = async function(req, res){
        await Point.findOneAndUpdate({ email: req.params.email }, { points: req.params.points }, (err) => {
            if(err) return res.sendStatus(401)
            else{
                return res.sendStatus(200)
            }
        })
}