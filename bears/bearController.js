const router = require('express').Router();
const Bear = require('./bearModel')

router
  .route('/')
  .get((req, res) => {
    Bear.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
    })
  })
  .post((req, res) => {
    if(!species || !latinName){
      return res.status(404).json({ errorMessage: "Please provide both species and latinName for the bear." });
    }
    const { species, latinName } = req.body;
    const newBear = new Bear ({ species, latinName });
    newBear
      .save() //this will 'insert' a document into the Bear collection
      .then(savedBear => res.status(201).json({ status: 'please implement POST functionality' }))
      .catch(err => res.status(422).json({ errorMessage: "There was an error while saving the bear to the database"}))
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)//find a specifc resource by using their ID
    .then(foundBear => {
      if (foundBear === 0) {
        return res.status(404).json({ errorMessage: "The bear with the specified ID does not exist." });
      }
      res.status(200).json(foundBear)
    })
      .catch(err => res.status(500).json({ errorMessage: "The bear information could not be retrieved."}))
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(deletedBear => {
        if (foundBear === 0) {
          return res.status(404).json({ errorMessage: "The bear with the specified ID does not exist." });
        }
        res.status(200).json({ deletedBear })
      })
      .catch(err => res.status(500).json({ errorMessage: "The bear could not be removed"}))
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    //const UpdatedBear = new Bear({ species, latinName });
    Bear.findByIdAndUpdate(id, req.body)
    if (foundBear === 0) {
      return res.status(404).json({ errorMessage: "The bear with the specified ID could not be updated." });
    }
      .then(UpdatedBear => {
        res.status(200).json( UpdatedBear )
      })
        .catch(err => res.status(500).json({ errorMessage: "The bear could not be removed"}))
  });

module.exports = router;
