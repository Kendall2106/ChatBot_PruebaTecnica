import express from 'express'
import { PORT } from './config.js'
import cors from 'cors';
import RouterChatBot from './src/routes/routerChatBot.js';

const app = express();
app.use(cors());
app.use(express.json());

const routerChatBot = new RouterChatBot();
routerChatBot.config(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});