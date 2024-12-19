import { useState } from "react"
import Statistics from "../components/Statistics"
import Button from "../components/Button"

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBadClick = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  const total = (good + neutral + bad)
  const positivePercentage = total > 0 ? ((good/total)*100) : 0

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>

      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad} total={total}
        positivePercentage={positivePercentage}
      />
    </div>
  )
}

export default App
