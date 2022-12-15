const query = require("../database/db_query")
const dbClient = require("../database/dbconfig");

exports.getAllConge = (req, res) => {
  
    sql = `SELECT * from conge `;
  query.sql_request(sql, null, res, true);
};

exports.getCongeByUser = (req, res) => {
    const  id  = req.params.id;
    sql = `SELECT * from conge WHERE id_user = ${id}`;
  query.sql_request(sql, null, res, true);
};

exports.demandeConge = (req, res) => {
  
    const  {id_user, date_d, date_f, type_conge}  = req.body;
  
      sql = `SELECT *  FROM users  WHERE id_user = ${id_user}`;

      if(type_conge==="paye")
      {
        dbClient.query(sql, (err, rows) => { 
          

        });
        res.send(rows[0].solde_conge)
      }
      else if(type_conge==="maternale")
      {
        res.send("maternale")
      }
      else if(type_conge==="paternale")
      {
        res.send("pternale")
      }
      else if(type_conge==="RTT")
      {
        res.send("rtt")
      }
      
    query.sql_request(sql, null, res, true);
  };