const express = require("express"); /// imort express
const router = express.Router();
const user=require("../controllers/userController");

router.get("/get_one_by_id/:id",user.getOneUser);


//
module.exports=router;