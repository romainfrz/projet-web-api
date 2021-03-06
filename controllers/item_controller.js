const db = require("../models")
const Item = db.items
const Sports = db.sports

exports.createItem = (request, response) => {
    // Validate request
    if (!request.body.itemName || !request.body.sportId || !request.body.user) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create a Item
    const item = {
        itemName: request.body.itemName,
        usage: request.body.usage ? request.body.usage : null,
        sportId: request.body.sportId,
        user: request.body.user
    }

    // Save Item in the database
    Item.create(item)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Item..."
            })
        })
}

exports.getItemsByName = (request, response) => {
    const itemName = request.params.name
    const user = request.params.user
    Item.findAll({ where: { itemName: itemName, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.getItemById = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    Item.findAll({ where: { id: id, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.getItemsByUserId = (request, response) => {
    const user = request.params.user
    Item.findAll(
        {
            where: { user: user },
            include: [{
                model: Sports,
                attribute: ['sportName'],
                required: false
            }]
        })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.getItemsBySport = (request, response) => {
    const sport = request.params.sport
    const user = request.params.user
    Item.findAll({ where: { sport: sport, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.updateItem = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    Item.update(request.body, { where: { id: id, user: user } })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "Item was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Item with id=" + id
            })
        })
}

exports.deleteItem = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    Item.destroy({ where: { id: id, user: user } })
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "Item was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Item with id=" + id
            })
        })
}