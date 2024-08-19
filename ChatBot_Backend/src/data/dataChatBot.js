import { pool } from "./dbContext/db.js";
import Fuse from 'fuse.js';

class DataChatBot {

  // Method to get the data from the database
  async getQuestions() {
    try {
      const [results] = await pool.query('call sp_selectAnswer();');
      return results[0];
    } catch (err) {
      throw new Error('Error al obtener datos de la base de datos.');
    }
  }

  // Method that compares user questions
  async consultAnswer(query) {

    try {
      const data = await this.getQuestions();

      // Configure Fuse.js with the data obtained
      const options = { includeScore: true, threshold: 0.3, minMatchCharLength: 3, keys: ['question'], };
      const fuse = new Fuse(data, options);

      const result = fuse.search(query);

      if (result.length > 0) {
        return { response: result[0].item.answer };
      } else {
        return { response: "No estoy seguro de entender tu pregunta. Puedes preguntar sobre temas como el horario de atención,"+ 
          "cómo contactar con soporte técnico, o información sobre nuestros servicios. ¿Te gustaría probar alguna de estas preguntas?" };
      }
    } catch (err) {
      throw new Error('Hubo un error en el servidor.');
    }
  }


  //Insert new questions
  async addQuestion(question, answer) {
    try {
      const results = await pool.query(`Call sp_insertQuestion('${question}', '${answer}')`);

      return { message: 'Pregunta agregada exitosamente.' };

    } catch (err) {
      throw new Error('Hubo un error en el servidor.');
    }

  }

}

export default DataChatBot;

