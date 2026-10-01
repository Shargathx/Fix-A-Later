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

app.get("/api/items", async (req, res) => {
    const { data, error } = await supabase
        .from("bugs")
        .select("*");

    if (error) {
        console.error("Supabase error:", error);

        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

app.post("/api/items", async (req, res) => {
    const { title, priority } = req.body;

    if (!title || !priority) {
        return res.status(400).json({
            error: "Title and priority are required"
        });
    }

    const { data, error } = await supabase
        .from("bugs")
        .insert({
            title,
            priority
        })
        .select();

    if (error) {
        console.error("Supabase error:", error);

        return res.status(500).json({
            error: error.message
        });
    }

    res.status(201).json(data);
});

app.delete("/api/items/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("bugs")
        .delete()
        .eq("id", id)
        .select();

    if (error) {
        console.error("Supabase error:", error);

        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
