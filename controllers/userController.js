const query = require("../database/db_query")
const dbClient = require("../database/dbconfig");

exports.getOneUser = (req, res) => {
  
    const  id  = req.params.id;
  
      sql = `SELECT *  FROM users  WHERE id_user = ${id}`;
      
    query.sql_request(sql, null, res, true);
  };
  

