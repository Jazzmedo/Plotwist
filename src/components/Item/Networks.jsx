import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { DetailsContext } from '../context/DetailsContextProvider'
import './item.css'

function Networks() {
    let { id, type } = useContext(DetailsContext)

    let [title, setTitle] = useState('')
    let [data, setData] = useState([])
    let [release, setRelease] = useState("")
    useEffect(() => {
        getGenres()
        let x = data.name || data.title

        setTitle(manipulateString(x))
        setRelease((data.release_date || data.first_air_date || "").slice(0,4))
    }, [type, id, title, data, release])


    function manipulateString(str="") {
        str = str.toLowerCase()
        // Replace spaces with hyphens
        str = str.replace(/\s+/g, '-');
        str = str.replace(":", '-');

        // Replace '&' with 'and'
        str = str.replace('&', 'and');
        str = str.replace("--", '-');
        str = str.replace("---", '-');
        return str;
    }
    function getGenres() {
        if (type && id) {
            axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
                // console.log(res.data)
                setData(res.data)

            })
        }
    }

    console.log(data)
    return (
        <div className='flexonlyy' style={{ "gap": "1rem" }}>
            <div className="flexonlyy" style={{ "gap": "1rem" }}>
                <a className='fgsdasd' target='_blank' href={`https://ext.to/search/?q=${title.split("-").join("+")}+${type == 'movie' ? release : ""}`}>
                    <img className='netw' src={`https://ext.to/static/img/ext_logo.png`} />
                </a>
                <a className='fgsdasd' target='_blank' href={`https://subsource.net/subtitles/${title}${type == 'movie' ? "-"+release : ""}`}>
                    <img style={{ backgroundColor: '#000' }} className='netw' src={`https://subsource.net/static/media/logo_full_dark.5addecabd16c37b4c784.png`} />
                </a>
            </div>
            {Array.isArray(data.networks) ? data.networks.map(net => (
                <div key={net.id} className="flexonlyy">
                    <img className='netw' src={`https://image.tmdb.org/t/p/original/${net.logo_path}`} />
                </div>
            )) : <></>}
        </div>
    )
}

export default Networks