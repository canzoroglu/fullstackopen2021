import React, {useState, useEffect} from 'react' 

const api_key = process.env.REACT_APP_API_KEY

const Country = ({country, hide, weather}) => {


  const className = hide ? "hide-display" : ""

  if (weather) {
    return (
      <div key={country.numericCode} className={className}>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map(lan => <li key={lan.iso639_2}>{lan.name}</li>)}
        </ul>
        <img src={country.flag} alt="flag"/>
        <h2>Weather in {country.capital}</h2>
        <p><strong>temperature:</strong> {weather.current.temperature} celcius</p>
        <p><img src={weather.current.weather_icons[0]} alt="current-weather" /></p>
        <p><strong>wind: </strong>{weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
      </div>
    )
  }
  return (
    <div key={country.numericCode} className={className}>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lan => <li key={lan.iso639_2}>{lan.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag"/>
    </div>
  )
}

const Button = ({country}) => {

  const [hide, setHide] = useState(true)
  const [weather, setWeather] = useState('')

  const getWeather = async () => {
    try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      const jsonData = await response.json()
      setWeather(jsonData)

    } catch (error) {
      console.error(error.message)
    }

  }

  // useEffect(() => getWeather(), [])
  
  let text = "show"
  const handleVisibility = e => {
    text = e.target.textContent 
    if( text === "show") {
      getWeather()
      e.target.textContent = "hide"
      setHide(false)
    } 
    else {
      e.target.textContent = "show"
      setHide(true)
    }

  }
  return (
    <div>
      <button onClick={handleVisibility}>{text}</button>
      <Country country={country} hide={hide} weather={weather} />
    </div>
  )
  
}

const Countries = ({countries}) => {


  return (
    countries.map(country => {
      return (
        <div key={country.numericCode}>
          <p>{country.name}</p>
          <Button country={country}/>
        </div>
      )
    })
  )
}

const Filter = ({text, onChange}) => <p>filter shown with: <input onChange={onChange} value={text}/></p>

const App = () => {
  
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [weather, setWeather] = useState('')

  const getWeather = async (country) => {
    try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      const jsonData = await response.json()
      setWeather(jsonData)

    } catch (error) {
      console.error(error.message)
    }

  }

  const getNotes = async () => {
    try {
      const response = await fetch("https://restcountries.eu/rest/v2/all")
      const jsonData = await response.json()
      setCountries(jsonData)

    } catch (error) {
      console.error(error.message)
    }

  }

  useEffect(() => getNotes(), [])


  const countriesToShow = !filter ? [] : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = e => setFilter(e.target.value)

  if(countriesToShow.length > 10) {
    return (
    <div>
      <Filter text={filter} onChange={handleFilterChange} />
      Too many matches, specifiy another
    </div>)
  }
  else if(countriesToShow.length <= 10 && countriesToShow.length > 1) {
    return (
      <div>
        <Filter text={filter} onChange={handleFilterChange} />
        <Countries countries={countriesToShow} />
      </div>
    )
  }
  else if (countriesToShow.length === 1) { // burayı düzenle
    getWeather(countriesToShow[0])
    return (
      <div>
        <Filter text={filter} onChange={handleFilterChange} />
        <Country country={countriesToShow[0]} hide={false} weather={weather}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <Filter text={filter} onChange={handleFilterChange} />
      </div>
    )
  }
}


export default App