CREATE TABLE IF NOT EXISTS job_applications (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  company TEXT,
  job_title TEXT,
  date DATE,
  status TEXT,
  notes TEXT
);

INSERT INTO job_applications (company, job_title, date, status, notes) VALUES
('Microsoft', 'Developer', '2025-02-03', 'applied', 'Fingers crossed'),
('Google', 'Developer', '2025-02-04', 'applied', 'Fingers crossed'),
('Facebook', 'Developer', '2025-02-01', 'interview', 'Fingers crossed')

UPDATE job_applications SET company = 'Meta', job_title = 'CEO', status = 'rejected' WHERE id = 1