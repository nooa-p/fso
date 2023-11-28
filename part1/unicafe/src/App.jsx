import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const Heading = ({ text }) => {
  return <h1>{text}</h1>
}

const Static = ({ type, number }) => {
  return (
    <p>{type} {number}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <Heading text='statistics' />
      <Static type='good' number={good} />
      <Static type='neutral' number={neutral} />
      <Static type='bad' number={bad} />
    </div>
  )
}

export default App