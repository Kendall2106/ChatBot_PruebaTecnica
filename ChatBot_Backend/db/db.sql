CREATE DATABASE chatBot;

USE chatBot;

-- Create the questions table
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    answer TEXT NOT NULL,
    question TEXT NOT NULL,
    FULLTEXT (question)
);

-- Add the 10 default questions
INSERT INTO questions (answer, question)
VALUES 
('Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00.', '¿Cuál es el horario de atención?'),
('Puedes contactar con nuestro soporte técnico enviando un correo a soporte@example.com o llamando al 123-456-7890.', '¿Cómo puedo contactar con soporte técnico?'),
('Nuestra oficina está ubicada en la calle Falsa 123, Ciudad Ejemplo.', '¿Dónde se encuentra nuestra oficina?'),
('Ofrecemos una variedad de servicios, incluyendo consultoría, desarrollo de software y soporte técnico.', '¿Qué servicios ofrecemos?'),
('Para registrarte, haz clic en el botón "Registrarse" en la esquina superior derecha de la página principal y sigue las instrucciones.', '¿Cómo puedo registrarme en el sitio?'),
('Para recuperar tu contraseña, ve a la página de inicio de sesión y haz clic en "Olvidé mi contraseña". Sigue las instrucciones para restablecerla.', '¿Cómo puedo recuperar mi contraseña?'),
('Aceptamos tarjetas de crédito, débito y pagos a través de PayPal.', '¿Qué métodos de pago aceptan?'),
('Sí, puedes actualizar tu información de perfil iniciando sesión en tu cuenta y accediendo a la sección "Perfil".', '¿Puedo actualizar mi información de perfil?'),
('Actualmente, nuestro soporte está disponible en español e inglés.', '¿Ofrecen soporte en otros idiomas?'),
('Puedes encontrar más información sobre nuestros productos en la sección "Productos" de nuestro sitio web.', '¿Dónde puedo encontrar más información sobre sus productos?');

-- Stored procedure that allows you to select the answer depending on the question asked
CREATE PROCEDURE sp_selectAnswer(
)
BEGIN
  SELECT question, answer 
  FROM questions;
END

-- Stored procedure that allows adding new questions
CREATE PROCEDURE sp_insertQuestion(
  IN var_question VARCHAR(255),
  IN var_answer VARCHAR(255)
)
BEGIN
  INSERT INTO questions (question, answer) VALUES (var_question, var_answer);
END

