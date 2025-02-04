const API_URL = "http://localhost:5678";

async function getApplications() {
  const response = await fetch(`${API_URL}/applications`);
  const data = await response.json();
  console.log(data);
}
getApplications();
