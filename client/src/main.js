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
    const div = document.createElement("div");

    // Set text content
    h3.innerText = `Job Title: ${entry.job_title}`;
    pCompany.innerText = `Company: ${entry.company}`;
    pDate.innerText = `Date Applied: ${entry.date}`;
    pStatus.innerText = `Status: ${entry.status}`;
    pNotes.innerText = `Notes: ${entry.notes}`;

    // Append elements to the div
    div.appendChild(h3);
    div.appendChild(pCompany);
    div.appendChild(pDate);
    div.appendChild(pStatus);
    div.appendChild(pNotes);

    // Append the div to the applications container
    applicationsContainerElem.appendChild(div);
  });
}

