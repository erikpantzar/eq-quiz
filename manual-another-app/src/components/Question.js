import React, { useEffect, useState, useRef } from "react"
import { useQuery } from "react-query"
import useInterval from "../helpers/useInterval"


export default ({ 
  currentQuestion, 
  onAnswer, 
  bonus5050, 
  setBonus5050, 
  bonusTime, 
  setBonusTime, 
}) => {
  const GAMETIME = 15000
  const { data } = useQuery("questions")
  const [timeleft, setTimeleft] = useState(GAMETIME)
  const question = data.results[currentQuestion]
  const [options, setOptions] = useState([question.correct_answer, ...question.incorrect_answers])

  useInterval(() => {
    if (timeleft > 900) {
      setTimeleft(timeleft - 1000)
    } else {
      setTimeleft(0)
    }
  }, 1000)

  useEffect(() => {
    setTimeleft(GAMETIME)
    setOptions([question.correct_answer, ...question.incorrect_answers])
  }, [currentQuestion])

  const useExtraTime = () => {
    setTimeleft(timeleft + 10000)
    setBonusTime(true)
  }

  const use5050 = () => {
    const wrongAns = question.incorrect_answers.length
    if (wrongAns > 2) {
      setOptions([
        question.correct_answer, 
        ...question.incorrect_answers.slice(0, Math.round(wrongAns/2)) ])
    } else {
      setOptions([question.correct_answer])
    }

    setBonus5050(true)
  }

  return (
    <div>    
      <h2>
        {
          new DOMParser().parseFromString(question.question, "text/html")
            .documentElement.textContent
        }
      </h2>

      {timeleft === 0 && (
        <div>
          Too slow
          <button
            onClick={() => {
              onAnswer(currentQuestion, {
                correct: "UNANSWERED",
              })

              setTimeleft(GAMETIME)
            }}
          >
            Next question
          </button>
        </div>
      )}

      {timeleft > 0 &&
        options.map((opt, index) => (
          <button
            key={index}
            onClick={() => {
              onAnswer(currentQuestion, {
                correct: opt === question.correct_answer ? true : false,
                time: timeleft,
              })
            }}
          >
            {opt}
          </button>
        ))}

      {timeleft > 0 && (
        <div>
          <div style={{ fontSize: `${timeleft / 1000}rem` }}>
            {timeleft / 1000}
          </div>
          remaining...
        </div>
      )}


      {timeleft > 0 && (
        <section>
        {!bonus5050 && (<button onClick={() => use5050() }>50/50</button>)}
      {!bonusTime && (<button onClick={() => useExtraTime() }>+10s</button>)}
      </section>
      )} 

      
    </div>
  )
}
