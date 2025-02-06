import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

//Adding GET POST DELETE

// Root route
// app.get("/", (req, res) => res.json("Welcome to the Job Application Tracker!"));

// GET all job applications
app.get("/applications", async (req, res) => {
  const result = await db.query("SELECT * FROM job_applications");
  const jobApplication = result.rows;
  console.log(result);
  res.json(jobApplication);
});

// DELETE a job application by ID
app.delete("/applications/:id", async (req, res) => {
  console.log(req.params.id);

  const deleted = await db.query("DELETE FROM job_applications WHERE id = $1", [
    req.params.id,
  ]);

  res.json({ message: "Deleted", id: req.params.id });
});

app.post("/applications", async (req, res) => {
  const body = req.body; //req is the data the client is sending in a specific request
  console.log(body);

  const companyFromClient = body.company;
  const jobTitleFromClient = body.job_title;
  const dateFromClient = body.date;
  const statusFromClient = body.status;
  const notesFromClient = body.notes;

  const data = await db.query(
    `INSERT INTO job_applications (company, job_title, date, status, notes)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      companyFromClient,
      jobTitleFromClient,
      dateFromClient,
      statusFromClient,
      notesFromClient,
    ]
  );

  res.json(data.rows[0]); // Send back the newly inserted row
});

// UPDATE/ PUT an application
app.put("/applications/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { notes } = req.body;

  console.log(id);

  const update = await db.query(
    "UPDATE job_applications SET status = $2, notes = $3 WHERE id = $1",
    [id, status, notes]
  );
  res.json({
    updated: update.rowCount === 1,
  });
});

// Start the server
app.listen(process.env.PORT || 5678, () => {
  console.log(`App running on ${process.env.PORT || 5678}`);
});
