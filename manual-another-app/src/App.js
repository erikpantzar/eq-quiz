import React, { useState } from "react"
import Questions from "./components/Questions"
import Question from "./components/Question"
import Summary from "./components/Summary"
import { QueryCache, ReactQueryCacheProvider } from "react-query"
import "./styles.css"

const AMOUNT_OF_QUESTIONS = 11 // max 50

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default () => {
  // 0 intro, 1 quiz, 2 summary
  const [route, setRoute] = useState(0)
  // 0 - Index, AMOUNT OF QUESTIONS
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswer] = useState([])

  const [bonusTime, setBonusTime] = useState(false)
  const [bonus5050, setBonus5050] = useState(false)

  const handleAnswer = (index, answer) => {
    setAnswer([
      ...answers.slice(0, index),
      answer,
      ...answers.slice(index + 1, answers.length),
    ])

    if (currentQuestion < AMOUNT_OF_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      endGame()
    }
  }

  const endGame = () => {
    // Endgame
    queryCache.invalidateQueries("questions")
    setRoute(2)
    setCurrentQuestion(0)
    setBonus5050(false)
    setBonusTime(false)
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      {route === 0 && (
        <Questions amount={AMOUNT_OF_QUESTIONS} startQuiz={() => setRoute(1)} />
      )}

      {route === 1 && (
        <Question 
          currentQuestion={currentQuestion} 
          onAnswer={handleAnswer} 
          bonus5050={bonus5050}  
          setBonusTime={setBonusTime}
          setBonus5050={setBonus5050}
          bonusTime={bonusTime}
        />
      )}

      {route === 2 && (
        <Summary
          answers={answers}
          restart={() => {
            setRoute(0)
          }}
        />
      )}
    </ReactQueryCacheProvider>
  )
}
