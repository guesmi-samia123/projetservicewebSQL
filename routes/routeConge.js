const express = require("express"); /// imort express
const router = express.Router();
const conge=require("../controllers/congeController");


router.get("/get_all",conge.getAllConge);
router.get("/CongeNonVerif",conge.GetcongeNonVerifier);
router.get("/get_congeUser/:id",conge.getCongeByUser);
router.post("/demande_conge",conge.demandeConge);
router.put("/Accepter_conge",conge.Accepter);
router.post("/Refuser_conge",conge.refuser);


module.exports=router;
 