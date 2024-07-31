import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SeasonContext } from '../context/SeasonContext'
import Separator from '../Home/Separator'

function SeasCast() {


    let { cast, setCast, episodes, id, seasnum } = useContext(SeasonContext)
    useEffect(() => {

        if (id && seasnum > 0) { // Check if seasnum is defined before calling getCast
            getCast()
        }
    }, [id, seasnum]) // Include seasnum in the dependency array

    function getCast() {
        if (!seasnum) return; // Check if seasnum is defined before making the API call

        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasnum}/credits?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            setCast(res.data)
        })

    }

    console.log(cast.cast)

    return (
        <>
            <Separator />
            <div className='widthoo'>
                {cast.cast && cast.cast.length > 0 ? (
                    <>
                        <h1 className='trendssss trendsss'>Cast</h1>
                        <div className="allcastingg">
                            {cast.cast.slice(0, 10).map((ele) => (
                                <Link key={ele.id} to={`/person/${ele.id}`}>
                                    <div className='castcontt'>
                                        <img 
                                            src={ele.profile_path ? `https://image.tmdb.org/t/p/w500/${ele.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} 
                                            alt={ele.name} 
                                        />
                                        <h4 className='castnamee'>{ele.name}</h4>
                                        <h4 className='castcharr'>{ele.character}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </>
    )
}

export default SeasCast