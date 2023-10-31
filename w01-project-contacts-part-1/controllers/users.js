

/*

// GET
// Query for a user that has the firstName 'John'
async function getUserWithFirstName(collection) {
	const query = {firstName: 'John'};
	const person = await collection.findOne(query);

	console.log(person);
}

// POST
// Query to post a user with a firstName 'Abraham'
async function addUserWithFirstName(collection) {
	const query = {firstName: "Abraham"};
	const newPerson = await collection.insertOne(query);

	console.log(newPerson);
}

// PUT ( UPDATE )
// Query to update a user with firstName 'Abraham'
async function updateUserWithFirstName(collection) {
	const filter = {
		firstName: "Abraham",
		favoriteColor: "white"
	};

	const updateDocument = {
		$set: {
			favoriteColor: "White"
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	console.log(result);
}

// DELETE
// Query to delete a user with firstNAme 'Abraham' and favoriteColor 'unset'
async function deleteUserWithFirstNameAndFavoriteColor(collection) {
	const filter = {
		firstName: "Abraham",
		favoriteColor: {
			$exists: false
		}
	};

	const result = await collection.deleteOne(filter);

	console.log(result);
}

*/