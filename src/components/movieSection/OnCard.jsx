import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './onCard.css' // We'll create this new CSS file for better organization

function OnCard(ele) {
    useEffect(() => {
    }, [ele])

    return (
        <>
            <div className="topratedd">
                {
                    ele.movies.map(item => {
                        return (
                            <Link className="oncarddd" key={item.id} to={`/${ele.type}/${item.id}`}>
                                <img className="posterrrr" src={item.backdrop_path ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` : '/src/components/Season/asdfs.jpg'} alt={item.name || item.title} />
                                <div className="voteepp">{parseInt(item.vote_average * 10)}%</div>
                                <div className="episdetss">
                                    <img className='numberepp' src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : `https://imgur.com/IqNlhr9.jpeg`} alt="Poster" />
                                    <div style={{ width: "70px" }} className="spacer-mobile"></div>
                                    <div className="septerr"></div>
                                    <div className="detsdetss">
                                        <h6 className='nameeeee'>{item.name || item.title} <span className="year-display">({ele.type === "movie" ? item.release_date && item.release_date.split("-")[0] : item.first_air_date && item.first_air_date.split("-")[0]})</span></h6>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </>
    )
}

export default OnCard