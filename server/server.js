import express from 'express';
import { supabase } from "../client/src/supabaseClient.js"
const app = express()
const port = 3000
import cors from 'cors'

express.json({ limit: '10kb' })

app.use(cors())

app.use(cors({
    origin: process.env.VITE_FRONT_URL
}));

app.get('/api/items', async (req, res) => {
    const { data, error } = await supabase
        .from("bugs")
        .select("*");

    if (error) {
        console.log("Error")
    }

    console.log(data)
    res.json(data)
})

app.post('/api/items', async (req, res) => {
    const payload = req.body

    const { data, error } = await supabase
        .from("bugs")
        .insert({
            title: payload.title,
            priority: payload.priority
        }).select();

    if (error) {
        console.log("Error")
    }

    res.status(201).json(data);

})

app.delete('/api/items/:id', async (req, res) => {
    const payload = req.body
    const id = req.params

    const { data, error } = await supabase
        .from('bugs')
        .delete()
        .eq('id', id);

    if (error) {
        console.log("Error")
    }

    res.status(201).json(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})