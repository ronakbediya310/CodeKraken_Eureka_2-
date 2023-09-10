// app.js

const express = require('express');
const bodyParser = require('body-parser');
const categorizeUserIncome = require('./categorizeUserIncome');
const { PORT } = require('./config');

const app = express();

app.use(bodyParser.json());

app.post('/categorize', async (req, res) => {
  try {
    const { userIncome } = req.body;
    const userCategory = await categorizeUserIncome(userIncome);
    res.json({ category: userCategory });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
