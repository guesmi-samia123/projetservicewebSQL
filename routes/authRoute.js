const express = require("express"); /// imort express
const router = express.Router();
const auth=require("../controllers/auth");


router.post("/reg",auth.register);
router.post("/login",auth.signin);
router.get("/get_on_by_id/:id",auth.get_user_by_id);
router.put("/update/:id",auth.update);
// router.get("/get_all",evenement.getAllEvenement);
// router.get("/get_by_type_evenement/:id",evenement.getByTypeEvenement);

// router.delete("/delete/:id",evenement.delete);
// router.put("/update_etat/:id",evenement.update_etat);

//
module.exports=router;
 