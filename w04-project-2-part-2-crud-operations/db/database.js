const {MongoClient} = require("mongodb");
const dotenv = require("dotenv")
dotenv.config()

let dbConnection;

module.exports = {
	connectToDb: (callback) => {
		MongoClient.connect(process.env.DB_URI)
			.then((client) => {
				dbConnection = client.db("Pets");
				return callback();
			})
			.catch((error) => {
				console.error(error);
				return callback(error);
			});
	},
	getDb: () => dbConnection
};