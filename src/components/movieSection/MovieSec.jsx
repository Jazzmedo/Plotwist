import React, { useEffect, useState } from 'react'
import OnCard from './OnCard'
import axios from 'axios'
import Loading from '../Loading/Loading'
import Separator from '../Home/Separator'
import './movieSec.css'

function MovieSec(type) {
    let [movies, setMovies] = useState([])
    let [popular, setPopular] = useState([])
    let [upcoming, setUpcoming] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getMovies()
        document.title = `Plotwist | ${type.type === "movie" ? "Movies" : "TV Shows"}`;
        if (type && movies && popular && upcoming) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
        
        // Make footer responsive
        const updateFooterStyle = () => {
            const footer = document.querySelector('footer');
            if (footer) {
                if (window.innerWidth <= 768) {
                    footer.style.cssText = "box-shadow: 0px 0px 20px 15px rgba(0, 0, 0, 0.5);margin-top: 40px;";
                } else {
                    footer.style.cssText = "box-shadow: 0px 0px 40px 30px rgba(0, 0, 0, 0.5);margin-top: 80px;";
                }
            }
        };
        
        updateFooterStyle();
        window.addEventListener('resize', updateFooterStyle);
        
        return () => {
            window.removeEventListener('resize', updateFooterStyle);
        };
    }, [movies, popular, upcoming, isLoading, type])

    function getMovies() {
        axios.get(`https://api.themoviedb.org/3/${type.type}/top_rated?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            setMovies(res.data.results.slice(0, 12))
        })
        axios.get(`https://api.themoviedb.org/3/${type.type}/popular?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            setPopular(res.data.results.filter(item => 
                ![10767, 10763, 10764, 10768, 10766].some(id => item.genre_ids.includes(id))
            ).slice(0, 12))
        })
        if (type.type === "movie") {
            axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
                setUpcoming(res.data.results.slice(0, 12))
            })
        }
    }

    return (
        <>
            <Loading isLoading={isLoading} />
            {!isLoading && <>
                <div className="responsive-container moviesecc">
                    <h1 className='trendsss trendssss'>Top Rated</h1>
                    <OnCard type={type.type} movies={movies} />
                    <Separator />
                    <h1 className='trendsss trendssss'>Popular Now</h1>
                    <OnCard type={type.type} movies={popular} />
                    {type.type === "movie" ?
                        <>
                            <Separator />
                            <h1 className='trendsss trendssss'>Upcoming</h1>
                            <OnCard type={type.type} movies={upcoming} />
                        </> :
                        <></>
                    }
                </div>
            </>}
        </>
    )
}

export default MovieSec