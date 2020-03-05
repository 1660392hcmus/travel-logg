const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1337"
    : "https://travel-log-api.now.sh";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey
    },
    body: JSON.stringify(entry)
  });
  let json;
  if (response.headers.get("content-type").includes("text/html")) {
    const message = await response.text();
    json = {
      message
    };
  } else {
    json = await response.json();
  }
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}

export async function deleteLogEntry(entry) {
  // const apiKey = entry.apiKey;
  // delete entry.apiKey;
  await fetch(`${API_URL}/api/logs/${entry}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
      // "X-API-KEY": apiKey
    }
  });
  // const respone = await fetch(`${API_URL}/api/logs`, {
  //   method: "DELETE"
  // }).then(res => respone.json());
  console.log("delete");
  // return;
}
