import React, { useEffect, useState, useRef } from "react"
import { useQuery } from "react-query"
import useInterval from "../helpers/useInterval"

export default ({ currentQuestion, onAnswer }) => {
  const GAMETIME = 15000

  const { data } = useQuery("questions")
  const [timeleft, setTimeleft] = useState(GAMETIME)

  const question = data.results[currentQuestion]
  const options = [question.correct_answer, ...question.incorrect_answers]

  useInterval(() => {
    if (timeleft > 900) {
      setTimeleft(timeleft - 1000)
    } else {
      setTimeleft(0)
    }
  }, 1000)

  useEffect(() => {
    setTimeleft(GAMETIME)
  }, [currentQuestion])

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
              console.log({ given: opt, correct: question.correct_answer })
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
    </div>
  )
}
