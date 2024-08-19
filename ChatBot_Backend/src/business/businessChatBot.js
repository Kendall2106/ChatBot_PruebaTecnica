import DataChatBot from "../data/dataChatBot.js";

class BusinessChatBot {
  constructor() {
    this.dataChatBot = new DataChatBot();
  }

  async consultAnswer(query) {
    return await this.dataChatBot.consultAnswer(query);
  }

  async addQuestion(question,answer) {
    return await this.dataChatBot.addQuestion(question,answer);
  }

}

export default BusinessChatBot;