const express = require('express');
const friendsRouter = express.Router();

const friendsController = require('../controllers/friendsController');

friendsRouter.use((req,res,next)=>{
    console.log('ip address :', req.ip);
    next();
});

friendsRouter.post('/friends', friendsController.postFriend);
friendsRouter.get('/friends/:id', friendsController.getFriend);

module.exports = friendsRouter;