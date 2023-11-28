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
    <span>{type} {number}</span>
  )
}

const App = () => {
  const [reviews, setReviews] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const newGood = reviews.good + 1
    const newTotal = total + 1
    setReviews({...reviews, good: newGood})
    setTotal(newTotal)
    setPositive((newGood / newTotal) * 100)
    setAverage(((newGood) + (reviews.bad * -1)) / newTotal)
  }

  const handleNeutral = () => {
    const newTotal = total + 1
    setReviews({...reviews, neutral: reviews.neutral + 1})
    setTotal(newTotal)
    setPositive((reviews.good / (total + 1)) * 100)
    setAverage(((reviews.good) + (reviews.bad * -1)) / newTotal)
  }

  const handleBad = () => {
    const newTotal = total + 1
    const newBad = reviews.bad + 1
    setReviews({...reviews, bad: newBad})
    setTotal(newTotal)
    setPositive((reviews.good / newTotal) * 100)
    setAverage((reviews.good + (newBad * -1)) / newTotal)
  }

  return (
    <div>
      <Heading text='give feedback' />
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />
      <Heading text='statistics' />
      <Static type='good' number={reviews.good} /> <br />
      <Static type='neutral' number={reviews.neutral} /> <br />
      <Static type='bad' number={reviews.bad} /> <br />
      <Static type= 'total' number={total} /> <br />
      <Static type='average' number={average} /> <br />
      <Static type='positive' number={positive} /> %
    </div>
  )
}

export default App