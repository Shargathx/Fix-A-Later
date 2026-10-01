const API_BASE_URL = "http://localhost:3000/api/items";

export async function getAllItems() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch bugs");
  return await res.json();
}

export async function addItem(bug) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bug),
  });
  if (!res.ok) throw new Error("Failed to add bug");
  return await res.json();
}

export async function deleteItem(id) {
  const response = await fetch(`http://localhost:3000/api/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
}