const companyElem = document.getElementById("company");
const positionElem = document.getElementById("position");
const appliedDateElem = document.getElementById("applied-date");
const statusElem = document.getElementById("status");
const notesElem = document.getElementById("notes");
const applicationsContainerElem = document.getElementById(
  "applications-container"
);

const formElem = document.getElementById("application-form");
const formSectionEditElem = document.getElementById("form-section-edit");
const formSectionElem = document.getElementById("form-section");

const API_URL = "https://week5-group-project-server-i81x.onrender.com";

async function getApplications() {
  const response = await fetch(`${API_URL}/applications`);
  const data = await response.json();
  console.log(data);
  displayApplications(data);
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
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const div = document.createElement("div");

    // Set text content
    h3.innerText = `Job Title: ${entry.job_title}`;
    pCompany.innerText = `Company: ${entry.company}`;
    pDate.innerText = `Date Applied: ${formatDate(entry.date)}`;
    pStatus.innerText = `Status: ${entry.status}`;
    pNotes.innerText = `Notes: ${entry.notes}`;
    deleteButton.innerText = "Delete Application";
    editButton.innerText = "Edit Application";

    deleteButton.addEventListener("click", function () {
      handleDelete(entry.id); //calls function to delete entry
    });

    // eventListener on Edit button which calls handleEdit function
    editButton.addEventListener("click", function () {
      // show edit form with existing values
      showEditForm(entry);
      // handleEdit(entry.id);
      console.log("update data");
    });

    // Append elements to the div
    div.appendChild(h3);
    div.appendChild(pCompany);
    div.appendChild(pDate);
    div.appendChild(pStatus);
    div.appendChild(pNotes);
    div.appendChild(deleteButton);
    div.appendChild(editButton);

    if (entry.status === "accepted") {
      div.style.backgroundColor = "teal";
    } else if (entry.status === "rejected") {
      div.style.backgroundColor = "maroon";
    } else if (entry.status === "pending") {
      div.style.backgroundColor = "orange";
    } else if (entry.status === "interview") {
      div.style.backgroundColor = "navy";
    }

    // Append the div to the applications container
    applicationsContainerElem.appendChild(div);
  });
}

//function to delete entry
async function handleDelete(id) {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: "DELETE",
  });
  getApplications();
}

// shows hidden edit form
function showEditForm(entry) {
  // hide add form
  formSectionElem.classList.add("hide");
  formSectionElem.classList.remove("show");

  // populate edit form
  const companyElemEdit = document.getElementById("company-edit");
  const positionElemEdit = document.getElementById("position-edit");
  const appliedDateElemEdit = document.getElementById("applied-date-edit");
  const statusElemEdit = document.getElementById("status-edit");
  const notesElemEdit = document.getElementById("notes-edit");
  const idEdit = document.getElementById("id-edit");

  idEdit.value = entry.id;
  companyElemEdit.value = entry.company;
  positionElemEdit.value = entry.job_title;
  appliedDateElemEdit.value = entry.date;
  statusElemEdit.value = entry.status;
  notesElemEdit.value = entry.notes;

  // show edit form
  formSectionEditElem.classList.add("show");
  formSectionEditElem.classList.remove("hide");
}

/*TODO: Refactor to use FormData*/
formElem.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents page from refreshing when submitted
  console.log(statusElem.value);
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

const applicationFormEdit = document.getElementById("application-form-edit");
applicationFormEdit.addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleEdit();
  formSectionElem.classList.remove("hide");
  formSectionElem.classList.add("show");
  formSectionEditElem.classList.remove("show");
  formSectionEditElem.classList.add("hide");

  // resetForms();
});

const updateButton = document.getElementById;

// function resetForms() {
//   // clear edit form values

//   // toggle edit form to hide
//   formSectionEditElem.classList.add("hide");
//   // show add application form
// }

/* TODO: Refactor using FormData */
// function to update existing application
async function handleEdit() {
  const statusEditElem = document.getElementById("status-edit");
  const notesEditElem = document.getElementById("notes-edit");
  const idEditElem = document.getElementById("id-edit");

  const response = await fetch(`${API_URL}/applications/${idEditElem.value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: statusEditElem.value,
      notes: notesEditElem.value,
    }),
  });
  getApplications();
}

// Function to format date in YYYY-MM-DD format
function formatDate(dateString) {
  const date = new Date(dateString); // Convert string to Date object
  const year = date.getFullYear(); // Get year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (0-based index, so +1)
  const day = date.getDate().toString().padStart(2, "0"); // Get day

  // Return formatted date as YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
