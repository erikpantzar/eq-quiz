import React, { useState } from "react"
import { useQuery } from "react-query"

export default ({ amount, startQuiz }) => {
  function fetchQuestions() {
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=23&difficulty=medium&type=boolean`
    return fetch(apiUrl).then((res) => res.json())
  }

  const { isLoading, isError, data, error } = useQuery(
    "questions",
    fetchQuestions
  )

  return (
    <section>
      <h1>Welcome to da quiz!</h1>
      <p>You will get {amount} questsions!</p>
      <p>Go on and good luck!</p>

      {isLoading && <p>Fetching questions....</p>}

      {!isLoading && !error && (
        <button onClick={() => startQuiz()}>Start quiz</button>
      )}
    </section>
  )
}
