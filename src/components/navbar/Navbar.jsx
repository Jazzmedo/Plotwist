import 'bootstrap/dist/css/bootstrap.css';
import '../Home/style.css';
import '../../main.css';
import './navbar.css';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTv, faFilm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom'



function Navbar() {

    let [results, setResults] = useState([])
    let [searchh, setSearchh] = useState("")


    useEffect(() => {
        document.getElementById('searchInput').addEventListener('input', function () {
            var input = this.value.toLowerCase();
            var items = document.querySelectorAll('.dropdown-item');
            items.forEach(function (item) {
                if (item.textContent.toLowerCase().includes(input)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            document.getElementById('dropdownMenu').style.display = input ? 'block' : 'none';
            setSearchh(input)
        });
        if (searchh) {
            getResults();
        }
        Array.from(document.querySelectorAll('.dropdown-item')).map(each => {
            each.addEventListener('click', () => {
                document.getElementById('dropdownMenu').style.display = 'none'
                setSearchh("")
            })
        })
        Array.from(document.querySelectorAll('.preventt')).map(each => {
            each.addEventListener('click', () => {
                document.getElementById('dropdownMenu').style.display = 'none'
                setSearchh("")
            })
        })

    }, [searchh, results]);

    function getResults() {
        const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchh)}&api_key=80db2c88f978a7c08fd8b402180ede6e`;
        axios.get(url)
            .then(res => {
                // console.log('API Response:', res.data); // Log the API response
                if (res.data && res.data.results) {
                    setResults(res.data.results.slice(0, 8));
                } else {
                    setResults([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setResults([]);
            });
    }

    return (
        <>
            <nav id="Nv" className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand preventt" to="/Plotwist"><img alt='' src={require("../../logo/wlogo.png")} height="30" /></Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item preventt">
                        <Link className="nav-link" to="/Plotwist">Home</Link>
                    </li>
                    <li className="nav-item preventt">
                        <Link className="nav-link " to="/Plotwist/Movies">Movies</Link>
                    </li>
                    <li className="nav-item preventt">
                        <Link className="nav-link " to="/Plotwist/TV">TV Shows</Link>
                    </li>
                </ul>
                <div className="search-bar">
                    <input value={searchh} type="text" placeholder="Search..." id="searchInput" autocomplete="off" onChange={(e) => setSearchh(e.target.value)} />
                    <div className="dropdown-menu" id="dropdownMenu">
                        {results.length > 0 ? results.map(item =>
                            item ? (
                                <>
                                {/* {console.log(item.original_language)} */}
                                    <Link style={{fontFamily: item.original_language === 'ar' ? "Cairo, sans-serif" : undefined }}  key={item.id} to={`/Plotwist/${item.media_type}/${item.id}`} className="dropdown-item">
                                        <span className='typee'>
                                            {item.media_type === 'person' ? <FontAwesomeIcon icon={faUser} /> :
                                                item.media_type === 'tv' ? <FontAwesomeIcon icon={faTv} /> :
                                                    <FontAwesomeIcon icon={faFilm} />}
                                        </span > : {item.original_language==='ar'||item.original_language==='es'?item.original_name||item.original_title: item.title || item.name} <span>{item.media_type === 'tv' ? (item.first_air_date ? `(${item.first_air_date.split("-")[0]})` : '') : (item.release_date ? `(${item.release_date.split("-")[0]})` : '')}</span>
                                    </Link>
                                </>
                            ) : <></>) : <div>No results found</div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar