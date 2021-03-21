import React, {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Statistic = ({text, value}) => `${text} ${value}` 

const Statistics = ({parts}) => {
  
  const allValue = parts.filter(item => item.text === "all")[0].value
  
  if (allValue > 0) {
    return (
      <table>
          <tbody>
            <tr>
              <td><Statistic text={parts[0].text} value={parts[0].value} /></td>
            </tr>
            <tr>
              <td><Statistic text={parts[1].text} value={parts[1].value} /></td>
            </tr>
            <tr>
              <td><Statistic text={parts[2].text} value={parts[2].value} /></td>
            </tr>
            <tr>
              <td><Statistic text={parts[3].text} value={parts[3].value} /></td>
            </tr>
            <tr>
              <td><Statistic text={parts[4].text} value={parts[4].value.toFixed(1)} /></td>
            </tr>
            <tr>
              <td><Statistic text={parts[5].text} value={parts[5].value.toFixed(1) + " %"} /></td>
            </tr>
          </tbody>
      </table>
    )
  }
  return (
    <div>
        No feedback given
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good*100/all
  const parts = [
    {text:"good", value:good}, {text:"neutral", value:neutral}, {text:"bad", value:bad},
    {text:"all", value:all}, {text:"average", value:average}, {text:"positive", value:positive}
  ]
  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header header="give feedback"/>
      <Button handleClick={addGood} text={parts[0].text}/>
      <Button handleClick={addNeutral} text={parts[1].text}/>
      <Button handleClick={addBad} text={parts[2].text}/>
      <Header header="statistics"/>
      <Statistics parts={parts} />
    </div>
  )
}

export default App