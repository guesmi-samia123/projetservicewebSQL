const client = require("./dbconfig");
module.exports.sql_request = (sql, values, res,totalItems) => {
  client.query(sql, values, (err, rows) => {
    if (!err) {
      if (rows.length > 0 || rows.affectedRows > 0){
        return res.status(sql.includes("insert") ? 201 : 200).json({
          err: false,
          totalItems: totalItems==true  ? rows[0].totalItems :  null,
          rows:rows,
          message: "Successful operation !",
        });
      }
      else
        return res.status(404).json({
          // err:true,
          message: "No (data,operation) (found,done) ! ",
          // message:err,
        });
    } else {
      return res.status(500).json({
        err: true,
        message: err.sqlMessage,
        // message:err.sqlMessage.includes('Duplicate')?'Data already exists ! ':'An error occured in server ! Retry later',
      });
    }
  });
};
