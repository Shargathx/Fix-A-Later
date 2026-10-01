import express from 'express';
const app = express()
const port = 3000
import cors from 'cors'

express.json({ limit: '10kb' })

app.use(cors())

app.use(cors({
    origin: process.env.VITE_FRONT_URL
}));

app.get('/api/items', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/items', (req, res) => { })

app.delete('/api/items/:id', (req, res) => { })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})