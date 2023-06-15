const cors = require('cors');
const express = require('express');
const testData = require('./TestData.json');

const api = express();
const port = 4000; // Replace with your desired port number
api.use(cors());

// Endpoint to get a list of 10 random words
api.get('/words', (req, res) => {
  const selectedWords = getRandomWords(testData.wordList, 10);
  res.json(selectedWords);
});

// Function to select random words from the wordsList array
function getRandomWords(wordsList, count) {
  const selectedWords = [];
  const adjective = getRandomWordByPos(wordsList, 'adjective');
  const adverb = getRandomWordByPos(wordsList, 'adverb');
  const noun = getRandomWordByPos(wordsList, 'noun');
  const verb = getRandomWordByPos(wordsList, 'verb');

  selectedWords.push(adjective, adverb, noun, verb);

  for (let i = 4; i < count; i++) {
    const randomWord = getRandomWord(wordsList);
    selectedWords.push(randomWord);
  }

  return selectedWords;
}

// Function to get a random word from the wordsList array
function getRandomWord(wordsList) {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[randomIndex];
}

// Function to get a random word by a specific part of speech (pos)
function getRandomWordByPos(wordsList, pos) {
  const filteredWords = wordsList.filter((word) => word.pos === pos);
  return getRandomWord(filteredWords);
}


// Start the server
api.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
