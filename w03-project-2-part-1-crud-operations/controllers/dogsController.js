const {ObjectId} = require("mongodb");

exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await req.database.collection("dogs")
      .find()
      .sort({firstName: 1})
      .toArray();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({error: "Could not fetch the users"});
  }
};

exports.getDogById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const document = await req.database.collection("dogs").findOne({_id: new ObjectId(req.params.id)});
      res.status(200).json(document);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not fetch documents: ${err}`});
  }
};

exports.createDog = async (req, res) => {
  try {
    const dog = req.body;
    const result = await req.database.collection("dogs").insertOne(dog);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({error: `Could not create new document: ${error}`});
  }
};

exports.updateDog = async (req, res) => {
  try {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const result = await req.database.collection("dogs").updateOne({_id: new ObjectId(req.params.id)}, {$set: updates});
      res.status(200).json(result);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not update the document: ${err}`});
  }
};

exports.patchDog = async (req, res) => {
  try {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const result = await req.database.collection("dogs").updateOne({_id: new ObjectId(req.params.id)}, {$set: updates});
      res.status(200).json(result);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not update the document: ${err}`});
  }
};

exports.deleteDog = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const result = await req.database.collection("dogs").deleteOne({_id: new ObjectId(req.params.id)});
      res.status(200).json(result);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not delete the document: ${err}`});
  }
};