

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
// Removed passport and JWT middleware imports
import apiroutes from './routes/index.js';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Removed passport initialization

const server = createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A dashboard client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Attach io to request for real-time broadcast
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', apiroutes);

import Tourist from './models/tourist.js';

import { connectMongo } from './config/database.js';

server.listen(PORT, async () => {
    console.log(`Server Started : ${PORT}`);
    await connectMongo(); // Ensure MongoDB connection is established
    // await connectMySQL();
    await Tourist.sync(); // Auto-create the 'tourists' table if it doesn't exist
    console.log('Database connections established');
});



