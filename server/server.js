import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabase } from "../../Fix-A-Later/client/src/supabaseClient.js";

const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json({ limit: "10kb" }));

// GET all bugs
app.get("/api/items", async (req, res) => {
  const { data, error } = await supabase
    .from("bugs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST new bug
app.post("/api/items", async (req, res) => {
  const { title, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority are required" });
  }

  const { data, error } = await supabase
    .from("bugs")
    .insert([{ title, priority }])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// DELETE bug by ID
app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("bugs")
    .delete()
    .eq("id", Number(id)) // Convert string route param to integer
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});