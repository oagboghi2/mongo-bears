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
      res.status(500).json({ error: err})
    })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear ({ species, latinName });
    newBear
      .save() //this will 'insert' a document into the Bear collection
      .then(savedBear => res.status(201).json({ status: 'please implement POST functionality' }))
      .catch(err => res.status(422).json({ error: err}))
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id)//find a specifc resource by using their ID
    .then(foundBear => res.status(200).json(foundBear))
      .catch(err => res.status(500).json("error", {error: err}))
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(deletedBear => res.status(200).json({ deletedBear }))
      .catch(err => res.status(500).json("error", {error: err}))
  })
  .put((req, res) => {
    const { id } = req.params;
    const { species, latinName } = req.body;
    //const UpdatedBear = new Bear({ species, latinName });
    Bear.findByIdAndUpdate(id, req.body)
      .then(UpdatedBear => res.status(200).json( UpdatedBear ))
      .catch(err => res.status(500).json("error", { error: err }))
  });

module.exports = router;
