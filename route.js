const route = require("express").Router();
const connection = require("./connection");

/*
Example:
  req.body.query { first_name: "Andy" }
*/
readMany = async (req, res, next) => {
  try {
    const { first_name } = req.body;
    if (!first_name)
      throw { httpCode: 500, message: "req.body.first_name is required!" };
    console.log("User request recieved.", `first_name: ${first_name}`);

    // DANGEROUS!
    // Generating query string directly base on user input can be injected!
    const queryString = `select * from employees where first_name like '%${first_name}%'`;

    connection.query(queryString, (error, results, _) => {
      if (error) return next(error);
      res.json({ data: results });
    });
    // return res.json({ data: present(rows) }); // row[0] is better! Just want to make this
  } catch (error) {
    next(error);
  }
};

/*
A typical readMany route. Response with target object 
*/
route.get("/employees", readMany);
module.exports = route;
