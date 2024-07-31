import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Details from './Details'

function TV() {

    let [details, setData] = useState([])
    let [logo, setLogo] = useState([])
    let { id } = useParams()


    useEffect(() => {
        getDet()
        getLogo()
    }, [])

    function getLogo() {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            setLogo(res.data.logos[0].file_path)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((ress) => {
            setData(ress.data)
        })

    }

    function getDet() {

    }
    document.body.style.cssText = `background-image:url('https://image.tmdb.org/t/p/original/${details.backdrop_path}')`
    return (
        <>
            <Details data={details} type={"tv"} logo={logo} />
        </>
    )
}

export default TV
