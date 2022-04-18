const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req,res)=>{
    Question.find()
    .then(questions=>res.json(questions))
    .catch(err=>res.status(400).json('Error:'+err));
});


router.route('/add').post((req,res)=>{
    const surveyname=req.body.surveyname;
    const questiontext=req.body.questiontext;
    const scaletype=req.body.scaletype;
    const varname=req.body.varname;
    const options=req.body.options;
    


    const newQuestion = new Question({
        surveyname,
        questiontext,
        scaletype,
        varname,
        options
      });
      newQuestion.save()
  .then(() => res.json('Question added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res)=>{
    Question.findById(req.params.id)
    .then(question=>res.json(question))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/:id').delete((req, res) => {
    Question.findByIdAndDelete(req.params.id)
      .then(() => res.json('Question deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => {
    Question.findById(req.params.id)
      .then(question => {
        question.surveyname=req.body.surveyname;
        question.questiontext = req.body.questiontext;
        question.scaletype=req.body.scaletype;
        question.varname=req.body.varname;
        question.options = req.body.options;
  
        question.save()
          .then(() => res.json('Question updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;

