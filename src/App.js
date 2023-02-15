import './App.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
// axios is a library that allow us to make request API
import sad from './images/sad.gif';

function App() {
  
  // one component => not need objecy
  const [search, setSearch] = useState('')

  // hook : set the state and initialize
  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:'',
    humidity:'',
    minTemp:'',
    icon:''
  })
  
  const handleChange = (event) => {
    // make event to target the value(= search)
    setSearch(event.target.value)
    // update the state of search 
    console.log(search)
  }

  const handleSumit = (event) => {
    /* if we click submit button we lost what we typed and the default value is submitted. 
    Thus we should use event.preventDefault to submit what we actually typed */
    event.preventDefault()
    // value(search state) => input => form => ouSubmit => fetchData => city => result(allDATA state) => setAllDATA => rendering
    fetchData(search)
  }

  // after rendering, fetch the data info the API call
  useEffect(()=> {
    fetchData();
  },[] // set empty array to prevent API call fetchData again
  )

  // get API data from weather web and get input the city
  const fetchData = async (city) => {
    // try catch error handling
    try{
      const APIKEY = 'e9a04c5828b0f4730d5d1ac1141c06b3';
      // access to the data base and get data

      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);
      // use axois library and access the database site with .get() method
    
      await setAllData({
        city : result.data.name,
        country : result.data.sys.country,
        temperature : result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemp: result.data.main.temp_min,
        // API announce as 'weather':[{..."icon":'xxx'}]
        icon: `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
      });
    } catch (e) /* get API error as e */ {
      
      await setAllData({
        city : 'No Info',
        country : '-',
        temperature : '-',
        humidity: '-',
        minTemp: '-',
        // API announce as 'weather':[{..."icon":'xxx'}]
        icon: sad,
      });
    }
  }


  // return JSX. rendering at body(index.html)
  // js should announce with {} in JSX, css {{css}}
  return(
    // main > div > section 
    <div className='form'>
    {/*submit store and deliver the information 
    to connect the button to the form, we use onSubmit function like onChange
    the difference between onSubmit and onChange is that onSubmit get all info
    in the form and submit all of them however onChange just care the target. */}
    <form onSubmit={handleSumit}>
    {/*get info*/}
    <input
        autocomplete="off"
        // set the input value as a state of search
        value={search}
        // what type of info we get
        type='text'
        // name of the input => <button name='city'>
        name='city'
        // default sentence
        placeholder='Location'
        // listening the change in input value using function handleChange
        onChange={handleChange}
    />
    <button className='buttonInput' name='city'>Search</button>
    </form>
    <section className='weatherInfo'>
    <div className='locationInfo'>
        <h1>{allData.city}</h1>
        <h3>{allData.country}</h3>
        <img src={allData.icon}/>
        {/* make src js code */}
    </div>
    <div className='description'>
        <div className='d'>
        <h3>Temperature</h3>
        <p>{allData.temperature}°C</p>
        </div>
        <div className='d'>
        <h3>Minium Temperature</h3>
        <p>{allData.minTemp}°C</p>
        </div>
        <div className='d'>
        <h3>Humidity</h3>
        <p>{allData.humidity}%</p>
        </div>
    </div>
    </section>
</div>
  )
}

export default App;
