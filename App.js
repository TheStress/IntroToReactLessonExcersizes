import React, { useState } from 'react'

const Statistic = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad > 0) {
    const all = good + neutral + bad
    return (
      <>
        <table>
          <tbody>
            <tr><Statistic text="good" value={good}/></tr>
            <tr><Statistic text="neutral" value={neutral}/></tr>
            <tr><Statistic text="bad" value={bad}/></tr>
            <tr><Statistic text="all" value={all}/></tr>
            <tr><Statistic text="average" value={(good - bad) / all}/></tr>
            <tr><Statistic text="positive" value={good / all * 100}/></tr>
          </tbody>
        </table>
      </>
    )
  }
  else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [voting, setVoting] = useState([0, 0, 0, 0, 0, 0, 0])
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  const handleVoting = () => {
    let newVoting = {...voting}
    newVoting[selected] = newVoting[selected]+1
    setVoting(newVoting)

    if(newVoting[selected] > voting[mostVotesIndex]) {
      setMostVotesIndex(selected)
    }
  }

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
          <button onClick={()=>setGood(good+1)}>good</button>
          <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
          <button onClick={()=>setBad(bad+1)}>bad</button>
        <h1>anecdotes</h1>
          {anecdotes[selected]}
          <br></br>
          has {voting[selected]} votes
          <br></br>
          <button onClick={()=>handleVoting()}>vote</button>
          <button onClick={()=>setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
        <h1>anecdotes with the most votes</h1>
          {anecdotes[mostVotesIndex]}
            <br></br>
          has {voting[mostVotesIndex]} votes
        <h1>statistics</h1>
          <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App