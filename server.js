const db = require('./db/database');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck')
const apiRoutes = require('./routes/apiRoutes');

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// //Create a candidate
  // const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
  //                 VALUES (?,?,?,?)`;
  // const params = [1, 'Ronald', 'Firbank', 1];
  // //ES5 function, not arrow function to use 'this'
  // db.run(sql, params, function(err, result){
  //     if(err){
  //         console.log(err)
  //     }
  //     console.log(result, this.lastID);
  // });

//Use apiRoutes
app.use('/api', apiRoutes);

//Default response for any other request(Not Found) Catch all
app.use((req, res) => {
  res.status(404).end();
});

//Start server after DB connection
db.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});
