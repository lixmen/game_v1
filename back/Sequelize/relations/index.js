function applyTablesRelations(models) {
	Object.values(models)
		.filter(model => typeof model.associate === "function")
		.forEach(model => model.associate(models));
}	



module.exports = { applyTablesRelations };