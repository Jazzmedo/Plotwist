import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../Season/season.css'
import { HomeContext } from '../context/HomeContext'


function NowPlaying(ele) {
    useEffect(() => {

    }, [ele])

    // console.log(ele)
    return (
        <>
            <h1 className='trendsss trendssss'>{ele.query == "on_the_air" ? "Airing Now TV Shows" : "Now Playing Movies"}</h1>
            <div className="cardssss">
                {ele.data.map(item => (
                    <Link className="oncarddd" to={`/${ele.type}/${item.id}`}>
                        <img className="posterrrr" src={item.backdrop_path ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` : require(`../Season/asdfs.jpg`)} alt={item.name || item.title} />
                        <div className="voteepp">{parseInt(item.vote_average * 10)}%</div>
                        <div className="episdetss">
                        <img className='numberepp' src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : `https://imgur.com/IqNlhr9.jpeg`} alt="Poster" />
                            <div style={{width:"70px"}}> </div>
                            <div className="septerr"> </div>
                            <div className="detsdetss">
                                <h6 className='nameeeee'>{item.name || item.title} ({ele.type == "movie" ? item.release_date && item.release_date.split("-")[0] : item.first_air_date && item.first_air_date.split("-")[0]})</h6>
                            </div>
                        </div>
                    </Link>
                ))}
            </div >
        </>
    )
}

export default NowPlaying