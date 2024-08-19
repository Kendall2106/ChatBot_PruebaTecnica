import multer from 'multer';
import BusinessChatBot from '../business/businessChatBot.js';

class RouterChatBot {
    constructor() {
        this.businessChatBot = new BusinessChatBot();
    }

    //The endpoint of the consultAnswer output is defined
    config(app) {
        const upload = multer();

        app.get('/consultAnswer', upload.none(), async (req, res) => {
            const postData = req.query;
            res.json(await this.businessChatBot.consultAnswer(postData.question));
        });

        app.get('/addQuestion', upload.none(), async (req, res) => {
            const postData = req.query;
            res.json(await this.businessChatBot.addQuestion(postData.question, postData.answer));
        });

    }
}

export default RouterChatBot;