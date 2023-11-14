const port = process.env.PORT || 8080;


function buildHome(req, res) {
	res.render(`Users: http://localhost:${port}/users`)
	res.render(`Swagger: http://localhost:${port}/api-docs`)
}

module.exports = {
	buildHome
}