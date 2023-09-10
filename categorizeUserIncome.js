
// NOTE: I HAVE NOT SHARED MY PERSONAL CREDENTIALS HERE
// BUT IT IS WORKING

const dialogflow = require('dialogflow');
const { DIALOGFLOW_KEY, PROJECT_ID } = require('./config');

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: DIALOGFLOW_KEY,
});

async function categorizeUserIncome(income) {
  const sessionPath = sessionClient.sessionPath(PROJECT_ID, 'unique-session-id');
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: `Categorize income: ${income}`,
        languageCode: 'en',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    throw error;
  }
}

module.exports = categorizeUserIncome;
