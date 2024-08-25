import React, { useEffect, useContext } from 'react'
import { DetailsContext } from '../context/DetailsContextProvider'
import Networks from './Networks'

function Poster() {
    let { id, type, details } = useContext(DetailsContext)

    useEffect(() => {
    }, [type, id])


    // console.log(details)
    return (
        <>
            <div className="allpos">
                <div className="flexmode">

                    <div className="posdet">
                        <h3 style={{ borderBottom: "0px solid red", paddingBottom: "0px", fontFamily: details.original_language === 'ar' ? 'Marhey, sans-serif' : undefined }} className='posttle' >{details.original_title || details.original_name}</h3>
                        {((details.original_title !== details.title || details.original_name !== details.name ) && details.original_language!=="ar") ? <h3 className='posttle'>({details.title || details.name})</h3>
                            : <></>}
                        <h3 className='vote'>{parseInt(details.vote_average * 10)}% <span>({(details.vote_count / 1000 > 1 ? `${(details.vote_count / 1000).toFixed(2)}K` : details.vote_count)})</span></h3>
                    </div>
                    <img className='posterr' src={details.poster_path ? `https://image.tmdb.org/t/p/w500/${details.poster_path}` : `https://imgur.com/IqNlhr9.jpeg`} alt="" />
                </div>

                <><h2 className='watchnow'>Watch Now</h2> <Networks /></>
            </div>

        </>
    )
}

export default Poster