import React from 'react'
import './Count.css'

export default ({ time }) => (
  <p className="Count">
    <span className="Count-time" style={{ fontSize: `${time + 8}rem` }}>
      {time}
    </span>
    <span className="Count-label">Time Remaining...</span>
  </p>)