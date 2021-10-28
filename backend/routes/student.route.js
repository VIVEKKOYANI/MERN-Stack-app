let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let studantSchema = require('../Models/Student');

router.route('/create-student').post((req, res, next) => {
    studantSchema.create(req.body, (error, data) => {
        if(error){
            return next(error)
        }else{
            console.log(data);
            res.json(data)
        }
    })
})

router.route('/').get((req,res) => {
    studantSchema.find((error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

router.route('/edit-student/:id').get((req, res) => {
    studantSchema.findById({_id :req.params.id},(error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    }) 
})

router.route('/update-student/:id').post((req,res,next) => {
    studantSchema.findByIdAndUpdate({_id :req.params.id}, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error);
            console.log(error);
        }else{
            res.json(data)
            console.log("Student updated successfully !");
        }
    })
})

router.route('/delete-student/:id').delete((req, res, next) => {
    console.log("req", req.params.id);
    
    studantSchema.findByIdAndRemove({_id :req.params.id}, (error, data) => {
        // console.log("req.params.key",req.params.key);
        
      if (error) {
          console.log("error", error);
          
        return next(error);
      } else {
          console.log(data)
        res.status(200).json({
          msg: data
        })
      }
    })
})

module.exports = router;
