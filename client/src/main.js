const companyElem = document.getElementById('company');
const positionElem = document.getElementById('position');
const appliedDateElem = document.getElementById('applied-date');
const statusElem = document.getElementById('status');
const notesElem = document.getElementById('notes');
const applicationsContainerElem = document.getElementById('applications-container');
const formElem = document.getElementById("application-form")

const API_URL = "http://localhost:5678";

async function getApplications() {
  const response = await fetch(`${API_URL}/applications`);
  const data = await response.json();
  console.log(data);
  displayApplications(data)
}
getApplications();


// Function to display job applications on the page
function displayApplications(entries) {
  applicationsContainerElem.innerHTML = ""; // Clear the container before adding new entries

  entries.forEach((entry) => {
    // Create elements for job title, company, date, status, notes, and a container
    const h3 = document.createElement("h3");
    const pCompany = document.createElement("p");
    const pDate = document.createElement("p");
    const pStatus = document.createElement("p");
    const pNotes = document.createElement("p");
    const deleteButton = document.createElement("button")
    const div = document.createElement("div");

    // Set text content
    h3.innerText = `Job Title: ${entry.job_title}`;
    pCompany.innerText = `Company: ${entry.company}`;
    pDate.innerText = `Date Applied: ${entry.date}`;
    pStatus.innerText = `Status: ${entry.status}`;
    pNotes.innerText = `Notes: ${entry.notes}`;
    deleteButton.innerText = "Delete Application";

    deleteButton.addEventListener("click", function() {
      handleDelete(entry.id); //calls function to delete entry
    });

    // Append elements to the div
    div.appendChild(h3);
    div.appendChild(pCompany);
    div.appendChild(pDate);
    div.appendChild(pStatus);
    div.appendChild(pNotes);
    div.appendChild(deleteButton)

    // Append the div to the applications container
    applicationsContainerElem.appendChild(div);
  });
}



//function to delete entry
async function handleDelete(id) {
  const response = await fetch (`http://localhost:5678/applications/${id}` ,{
    method: "DELETE",
  });
  getApplications()
}

formElem.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents page from refreshing when submitted

  // Send a POST request to the server with the new job application data
  await fetch(`${API_URL}/applications`, {
    method: "POST", // Sends a POST request to the server to add a new entry
    headers: { "Content-Type": "application/json" }, // Specifies that the data is in JSON format
    body: JSON.stringify({
      company: companyElem.value, 
      job_title: positionElem.value,
      date: appliedDateElem.value, 
      status: statusElem.value, 
      notes: notesElem.value, 
    }),
  });

    // Clear form inputs after submission
    companyElem.value = "";
    positionElem.value = "";
    appliedDateElem.value = "";
    statusElem.value = "";
    notesElem.value = "";

    // Refresh the applications list
    getApplications();
});


