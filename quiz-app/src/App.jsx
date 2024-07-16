import './App.css'
import { useState } from 'react'
import { questions } from './components/Questions';

function App() {

  const [currentIndex,setCurrentIndex] = useState(0);
  const [userAnswer,setUserAnswer] = useState(null);
  const [isCorrect,setIsCorrect] = useState(null);
  const [feedBack,setFeedback] = useState(null);
  const [completed,setCompleted] = useState(null);
  const [score,setScore] = useState(0);

  const handleOptionClick = (option) => {
    setUserAnswer(option);
    checkAnswer(option);
  }

  const handleNextClick = () => {
    if(userAnswer === null){
      alert("Please choose an option before proceeding!!")
    }
    else if(currentIndex < questions.length - 1){
      setCurrentIndex(currentIndex + 1);
      setIsCorrect(null);
      setUserAnswer(null);
      setFeedback(null);
    }else if(currentIndex >= questions.length - 1){
      setCompleted(true);
      
    }
  }

  const resultPage = () => {
    return(
      <div className="result">
        <h2>Result</h2>
        <h3>Score: {score}</h3>
      </div>
      
  )}

  const checkAnswer = (option) => {
    if(option === questions[currentIndex].answer){
      setIsCorrect(true)
      setFeedback("Correct!!")
      setScore((prevScore) => prevScore + 1);
    }else{
      setIsCorrect(false)
      setFeedback("Incorrect!!!")
    }
  
  }

  return (
    <>
      {completed? (
        resultPage()
      ):(
        <div className='container'>
        <div className='questions'>
          <h1>Quiz App</h1>
          <h2>{questions[currentIndex].question}</h2>
            <ul className='options'id='choices'>
              {questions[currentIndex].options.map((option, index) => (
              <li key={index} 
              onClick={() => handleOptionClick(option)} 
              style={{
                backgroundColor: 
                userAnswer === option 
                ? isCorrect 
                ?'green'
                :'red'
                :'',
                color :
                 userAnswer === option? 
                 isCorrect ? 
                 'white'
                 :'white'
                 :'',
              }}>
                {option}
              </li>
              ))}
            </ul>

            {feedBack && (
              <div className='feedback'>
                {feedBack}
              </div>
            )}


          <div className="index">
            {currentIndex+1}/{questions.length}
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>
        
        </div>
      )}
      
    </>
  );
  
}
export default App;
