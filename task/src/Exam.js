import React, { Fragment, useState, useEffect } from 'react';
import './App.css';



const Exam = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [status, setStatus] = useState('');
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

    // Fetch the list of words from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/words')
      .then((response) => response.json())
      .then((data) => {
        setWords(data);
        console.log('Received words:', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


    // Set the current word index when the words array changes
  useEffect(() => {
    if (words.length > 0) {
      setCurrentWordIndex(words[0]);
    }
  }, [words]);

  const handleClick = (e) => {
    if (!currentWordIndex) {
      return;
    }

      // Update status and score if the answer is correct or if the answer is wrong

    const selectedPartOfSpeech = e.target.id;

    if (selectedPartOfSpeech === currentWordIndex.pos) {
      setStatus('CORRECT');
      setScore((prevScore) => prevScore + 1);
    } else {
      setStatus('WRONG ANSWER');
    }

    // Increment the counter and answered count
    setCounter((prevCounter) => prevCounter + 1);
    setAnsweredCount((prevCount) => prevCount + 1);

    // Display the final score if all questions have been answered
    setTimeout(() => {
      if (counter === words.length - 1) {
        setStatus(`Questions have ended. Your score: ${score}`);
      } else {         // Reset status and move to the next word
        setStatus('');
        setCurrentWordIndex(words[counter + 1]);
      }
    }, 2000);
  };

  const progress = (answeredCount / words.length) * 100;

    // Fetch a new set of words and reset the state
  const handleTryAgain =()=>{
    fetch('http://localhost:4000/words')
    .then((response) => response.json())
    .then((data) => {
      setWords(data);
      setCounter(0);
      setScore(0);
      setStatus('');
      setAnsweredCount(0);
      setCurrentWordIndex(data[0]);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  
  return (
    <Fragment>
      <div className='question-window'>
        <h2 className='Ehead'>Chose the correct answer</h2>

        <p>categorize the word according to its part of speech</p>
        <hr />
        {currentWordIndex ? (
          <p>
          {(counter < words.length) ? (
            <span>
              the word is <h2><strong>{currentWordIndex.word}</strong></h2>
            </span>
          ) : (
            ''
          )}
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <div className='progress-bar'>
          <div className='progress' style={{ width: `${progress}%` }}></div>
        </div>
        <div className={counter === words.length ? 'hide answer-rap' : 'answer-rap'}>
          <button id='adjective' onClick={handleClick}>adjective</button>
          <button id='adverb' onClick={handleClick}> adverb </button>
          <button id='verb' onClick={handleClick}> verb</button>
          <button id='noun' onClick={handleClick}>noun</button>
        </div>
        <strong>RESULT</strong>
        <h3 className={status === 'WRONG ANSWER' ? 'result-red' : 'result'}>{status}</h3>
        {counter === words.length && (
          <button className='try-again' onClick={handleTryAgain}>
            Try Again
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Exam;
