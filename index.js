import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "your_username",
  host: "localhost",
  database: "family_travel",
  password: "your_password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  users = [];
  const result = await db.query("SELECT * FROM users");
  const allUsers = result.rows;
  allUsers.forEach(user => {
    users.push(user);
  });
  const countries = await checkVisisted();
  const currUser = users.find((user) => user.id === currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currUser ? currUser.color : 'teal',
  });
});
app.post("/add", async (req, res) => {
  const input = req.body.country.trim();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = $1;",
      [input.toLowerCase()]
    );

    // Country not found
    if (result.rows.length === 0) {
      const countries = await checkVisisted();
      const currUser = users.find(user => user.id === currentUserId);

      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currUser.color,
        error: "Country not found"
      });
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );

      res.redirect("/");
    } catch (err) {
      const countries = await checkVisisted();
      const currUser = users.find(user => user.id === currentUserId);

      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currUser.color,
        error: "You already visited this country"
      });
    }

  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if(req.body.add){
    res.render("new.ejs");
  }else{
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.htm
  const name = req.body.name;
  const color = req.body.color;
  if(name.length === 0 || !color){
      res.render("new.ejs", {
      error: "Please give all inputs"
    });
  }else{
    try{
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [name, color]);
    res.redirect("/");
  }catch(e){
    console.log("Could not add a user. User already exists", e);
    res.render("new.ejs", {
      error: "User already exists"
    });
  }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
