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
app.get("/", (req, res) => res.json("Welcome to the Job Application Tracker!"));

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
        [companyFromClient, jobTitleFromClient, dateFromClient, statusFromClient, notesFromClient]
    );

    res.json(data.rows[0]); // Send back the newly inserted row
});


// UPDATE/ PUT an application
app.put("/applications/:id", async (req, res) => {
  const { id } = req.params;
  const { company } = req.body;
  const { job_title } = req.body;
  const { status } = req.body;
  const { notes } = req.body;

  console.log(req.params.id, req.body);
  const update = await db.query(
    "UPDATE job_applications SET company = $2, job_title = $3 date = $4, status = $5, notes = $6 WHERE id = $1",
    [id, company, job_title, date, status, notes]
  );
  //   res.json({ params: req.params.id, body: req.body });
});

// app.put("/applications/:id", async (req, res) => {
//   console.log(req.params.id, req.body);
//   const response = await fetch("http://localhost:5678/applications/:id", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//   });
//   res.json({ params: req.params.id, body: req.body });
// });

// Start the server
app.listen(process.env.PORT || 5678, () => {
  console.log(`App running on ${process.env.PORT || 5678}`);
});
