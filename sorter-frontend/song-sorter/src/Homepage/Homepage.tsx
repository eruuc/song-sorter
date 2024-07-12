import { useState, useEffect } from "react"
import axios from "axios"
import './Homepage.css'

function Homepage () {

    const[array, setArray] = useState([]);

    const fetchAPI = async() => {
        const response = await axios.get("http://localhost:8080/api/songs");
        console.log(response.data.users);
        setArray(response.data.users);
      }
    
      useEffect(() => {
        fetchAPI()
      }, [])
    

        /**
         * Use the below for displaying each row of the JSON file
         * 
         * {array.map((user, index) => (
         *    <div key={index}>
         *        <span>{user}</span>
         *        <br></br>
         *    </div>))}
        */
    return (
        <>
            <div className="main-container">
                <p className = 'title'>Spotify Song Sorter</p>
                <div className = 'artist-choosing-box'>
                    <input className = 'artist-search' type="text" placeholder="Search.."></input>
                </div>
            </div>
            
        </>
    )
}

export default Homepage