const jwt = require("jsonwebtoken");
const {BlackListModel} = require("../models/blacklist.model");

const auth = async(req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]||null;
        if(token){
            const existingToken = await BlackListModel.findOne({
                blacklist: {$in: token}
            });
            if(existingToken){
                return res.status(400).send({error: "Please Login again"})
            }
            const decoded = jwt.verify(token, "kamran");
            req.userID =decoded.userID
            return next()
        }
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports = {auth}