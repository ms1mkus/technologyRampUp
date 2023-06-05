const express = require("express");
const pg = require("./knexfile");
const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const insertedData = {
    sample: req.body.sampleData,
  };

  const users = await pg("test_table").insert(insertedData).returning("*");
  res.json(users);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
