const {ObjectId} = require("mongodb");

exports.getAllHorses = async (req, res) => {
  try {
    const horses = await req.database.collection("horses")
      .find()
      .sort({firstName: 1})
      .toArray();
    res.status(200).json(horses);
  } catch (error) {
    res.status(500).json({error: "Could not fetch the users"});
  }
};

exports.getHorseById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const document = await req.database.collection("horses").findOne({_id: new ObjectId(req.params.id)});
      res.status(200).json(document);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not fetch documents: ${err}`});
  }
};

exports.createHorse = async (req, res) => {
  try {
    const horse = req.body;
    const result = await req.database.collection("horses").insertOne(horse);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({error: `Could not create new document: ${error}`});
  }
};

exports.updateHorse = async (req, res) => {
  try {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const result = await req.database.collection("horses").updateOne({_id: new ObjectId(req.params.id)}, {$set: updates});
      res.status(200).json(result);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not update the document: ${err}`});
  }
};

exports.patchHorse = async (req, res) => {
  try {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const result = await req.database.collection("horses").updateOne({_id: new ObjectId(req.params.id)}, {$set: updates});
      res.status(200).json(result);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not update the document: ${err}`});
  }
};

exports.deleteHorse = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const result = await req.database.collection("horses").deleteOne({_id: new ObjectId(req.params.id)});
      res.status(200).json(result);
    } else {
      res.status(500).json({error: "Not a valid document id"});
    }
  } catch (err) {
    res.status(500).json({error: `Could not delete the document: ${err}`});
  }
};