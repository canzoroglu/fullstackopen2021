import React, {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Anectode = ({anectode, vote}) => {
  return (
  <>
    <p>{anectode}</p>
    <p>{vote}</p>
  </>
)}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnectode = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const incrementVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const maxVote = Math.max(...votes)
  let mostVoted = votes.indexOf(maxVote)
  if (maxVote > 0) {
    return (
      <div>
        <h1>Anectode of the Day</h1>
        <Anectode anectode={anecdotes[selected]} vote={`has ${votes[selected]} votes`} />
        <Button handleClick={incrementVote} text="votes" />
        <Button handleClick={nextAnectode} text="next anectode" />
        <h1>Anectode with most votes</h1>
        <Anectode anectode={anecdotes[mostVoted]} vote={`has ${votes[mostVoted]} votes`} />
      </div>
    )
  }
  return (
    <div>
      <h1>Anectode of the Day</h1>
      <Anectode anectode={anecdotes[selected]} vote={`has ${votes[selected]} votes`} />
      <Button handleClick={incrementVote} text="votes" />
      <Button handleClick={nextAnectode} text="next anectode" />
    </div>
  )
}

export default App