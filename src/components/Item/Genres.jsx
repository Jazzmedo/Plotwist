import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { DetailsContext } from '../context/DetailsContextProvider'

function Genres() {
    let {id,type,imdb} = useContext(DetailsContext)
    let [genre, setGenre] = useState([])
    useEffect(() => {
        getGenres()
    }, [type,id,imdb])

    function getGenres() {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            // console.log(res.data.genres)
            setGenre(res.data.genres)
        })
    }
    // console.log(imdb)
    return (
        <>
            <div className="genress">
                {genre.map(te => {
                    return <div key={te.id} className="genree">{te.name}</div>
                })}
                <a target='_blank' href={`https://www.themoviedb.org/${type}/${id}`}><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="" /></a>
                <a target='_blank' href={`https://www.imdb.com/title/${imdb}`}><img src="https://imgur.com/b1d2LOV.png" alt="" /></a>
            </div>
        </>
    )
}

export default Genres
