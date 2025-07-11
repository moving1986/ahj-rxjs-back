const express = require('express');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

function generateMessages(count = 1) {
  const messages = [];
  for (let i = 0; i < count; i++) {
    messages.push({
      id: uuidv4(),
      from: faker.internet.email(),
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      received: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400)
    });
  }
  return messages;
}


app.get('/messages/unread', (req, res) => {
  if (Math.random() < 0.1) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
    return;
  }

  const count = Math.floor(Math.random() * 3) + 1;
  res.json({
    status: 'ok',
    timestamp: Math.floor(Date.now() / 1000),
    messages: generateMessages(count)
  });
});


module.exports = app;


if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}