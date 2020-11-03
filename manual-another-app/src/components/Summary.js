import React from "react"

export default ({ answers, restart }) => {
  const unanswered = answers.filter(
    (unanswered) => unanswered.correct === "UNANSWERED"
  )
  const correctAnswers = answers.filter((answer) => answer.correct === true)

  console.log(answers)

  return (
    <div>
      <h1>Summary</h1>
      <p>
        {correctAnswers.length}/{answers.length} Correct answers
      </p>

      {unanswered.length > 0 && <p>{unanswered.length} timeouted</p>}

      <button onClick={() => restart()}>Do over!</button>
    </div>
  )
}
