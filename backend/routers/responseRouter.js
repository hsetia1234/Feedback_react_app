const router = require('express').Router();
let Response = require('../models/response.model');


router.route('/').get((req,res)=>{
  Response.find()
  .then(response=>res.json(response))
  .catch(err=>res.status(400).json('Error:'+err));
});



router.route('/add').post((req,res)=>{
  const username=req.body.username;
  const email=req.body.email;
  const userresponse=req.body.userresponse;

  const newResponse = new Response({
      username,
      email,
      userresponse,
    });
    newResponse.save()
.then(() => res.json('Response added!'))
.catch(err => res.status(400).json('Error: ' + err));
});






router.route('/:id').get((req,res)=>{
  Response.findById(req.params.id)
  .then(response=>res.json(response))
  .catch(err=>res.status(400).json('Error:'+err));
});



  router.route('/:id').delete((req, res) => {
    Response.findByIdAndDelete(req.params.id)
      .then(() => res.json('Response deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Response.findById(req.params.id)
      .then(response => {
        response.username = req.body.username;
        response.email=req.body.email;
        response.userresponse = req.body.userresponse;
  
        response.save()
          .then(() => res.json('response updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;

