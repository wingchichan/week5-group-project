import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();






//Adding GET POST DELETE 

// Root route
app.get("/", (req, res) => res.json("Welcome to the Job Application Tracker!"));

// GET all job applications
app.get("/applications", async (req, res) => {  
    const result = await db.query("SELECT * FROM job_applications");
    res.json(result.rows);
});

// DELETE a job application by ID
app.delete("/applications/:id", async (req, res) => {
    console.log(req.params.id);
    
    await db.query("DELETE FROM job_applications WHERE id = $1", [req.params.id]);

    res.json({ message: "Deleted", id: req.params.id });
});

// POST a new job application
app.post("/applications", async (req, res) => {
    const { company, job_title, date, status, notes } = req.body; //quicker way of

    // Use a safer parameterized query
    const data = await db.query(
        `INSERT INTO job_applications (company, job_title, date, status, notes) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [company, job_title, date, status, notes]
    );

    res.json(data.rows[0]); // Send back the newly inserted row
});

// Start the server
app.listen(process.env.PORT || 5678, () => {
    console.log(`App running on ${process.env.PORT || 5678}`);
});