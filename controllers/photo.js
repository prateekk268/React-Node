const path = require('path');

function getPic(req,res){
    // path.join(__dirname,'..','public','skimountain.jpg');
    res.sendFile(path.join(__dirname,'..','public','skimountain.jpg'));
}

module.exports = {
    getPic
}