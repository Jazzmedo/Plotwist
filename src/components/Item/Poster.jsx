import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { DetailsContext } from '../context/DetailsContextProvider'
import Networks from './Networks'

function Poster() {
    let { id, type, details } = useContext(DetailsContext)

    useEffect(() => {
    }, [type, id])


    // console.log(data)
    return (
        <>
            <div className="allpos">
                <div className="flexmode">

                    <img className='posterr' src={details.poster_path ? `https://image.tmdb.org/t/p/w500/${details.poster_path}` : `https://imgur.com/IqNlhr9.jpeg`} alt="" />
                    <div className="posdet">
                        <h3 style={{ borderBottom: "0px solid red", paddingBottom: "0px" }} className='posttle' >{details.original_title || details.original_name}</h3>
                        {(details.original_title != details.title || details.original_name != details.name) ? <h3 className='posttle'>({details.title || details.name})</h3>
                            : <></>}
                        <h3 className='vote'>{parseInt(details.vote_average * 10)}% <span>({(details.vote_count / 1000 > 1 ? `${(details.vote_count / 1000).toFixed(2)}K` : details.vote_count)})</span></h3>
                    </div>
                </div>

                <><h2 className='watchnow'>Watch Now</h2> <Networks /></>
            </div>

        </>
    )
}

export default Poster
