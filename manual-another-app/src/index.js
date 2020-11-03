import React from "react"
import ReactDOM from "react-dom"
import App from "./App.js"
import { ReactQueryDevtools } from "react-query-devtools"

ReactDOM.render(
  <>
    <ReactQueryDevtools />
    <App />
  </>,
  document.getElementById("root")
)
