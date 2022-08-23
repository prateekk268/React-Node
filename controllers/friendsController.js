const model = require('../models/friendsModel');

function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        });
    }
    const newFriend = {
        name: req.body.name,
        id: model.length
    };
    model.push(newFriend);
    return res.status(201).json(newFriend);
}

function getFriend(req, res) {
    try {
        const friendId = Number(req.params.id);
        if (friendId) {
            const friend = model[friendId];
            if (friend) {
                return res.status(200).json(friend)
            } else {
                return res.status(404).json({
                    error: 'Friend does not exist'
                })
            }
        } else {
            return res.status(200).json(model);
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
   
}

module.exports = {
    postFriend, getFriend
}