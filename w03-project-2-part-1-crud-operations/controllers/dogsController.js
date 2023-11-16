const {connectToDb, getDb} = require("../db/database");
const {ObjectId} = require("mongodb");

let database;
connectToDb((error) => {
  if (!error) {
    database = getDb();
  }
});

exports.getAllDogs = async (req, res) => {
  let dogs = [];

  database.collection("dogs")
    .find()
    .sort({firstName: 1})
    .forEach(user => {
      dogs.push(user);
    })
    .then(() => {
      res.status(200).json(dogs);
    })
    .catch(() => {
      res.status(500).json({error: "Could not fetch the users"});
    });
};

exports.getDogById = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    database.collection("dogs")
      .findOne({_id: new ObjectId(req.params.id)})
      .then(document => {
        res.status(200).json(document);
      })
      .catch(err => {
        res.status(500).json({error: `Could not fetch documents: ${err}`});
      });
  } else {
    res.status(500).json({error: "Not a valid document id"});
  }
};

exports.createDog = async (req, res) => {
  const dog = req.body;

  database.collection("dogs")
    .insertOne(dog)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({error: `Could not create new document: ${error}`});
    });
};

exports.updateDog = async (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    database.collection("dogs")
      .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: `Could not update the document: ${err}`});
      });
  } else {
    res.status(500).json({error: "Not a valid document id"});
  }
};

exports.patchDog = async (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    database.collection("dogs")
      .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: `Could not update the document: ${err}`});
      });
  } else {
    res.status(500).json({error: "Not a valid document id"});
  }
};

exports.deleteDog = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    database.collection("dogs")
      .deleteOne({_id: new ObjectId(req.params.id)})
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: `Could not delete the document: ${err}`});
      });
  } else {
    res.status(500).json({error: "Not a valid document id"});
  }
};