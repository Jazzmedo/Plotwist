import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { DetailsContext } from '../context/DetailsContextProvider'
import './item.css'

function Networks() {
    let { id, type, anime } = useContext(DetailsContext)

    let [title, setTitle] = useState('')
    let [data, setData] = useState([])
    let [release, setRelease] = useState("")
    useEffect(() => {
        getGenres()
        let x = data.name || data.title

        setTitle(manipulateString(x))
        setRelease((data.release_date || data.first_air_date || "").slice(0, 4))
    }, [type, id, title, data, release,anime])


    function manipulateString(str = "", by = "-") {
        str = str.toLowerCase()
        // Replace spaces with hyphens
        str = str.replace(/\s+/g, by);
        str = str.replace(":", '');
        str = str.replace(",", '');

        // Replace '&' with 'and'
        str = str.replace('&', 'and');
        str = str.replace("--", by);
        str = str.replace("---", by);
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

    // console.log(data)
    return (
        <div className='flexonlyy' style={{ "gap": "1rem" }}>
            <div className="flexonlyy" style={{ "gap": "1rem" }}>
                {anime ? <a style={{ backgroundImage: `url('https://i.imgur.com/0gVdwjP.png')`, padding: '5px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} rel='noreferrer' className='fgsdasd nyaa' target='_blank' href={`https://nyaa.si/?q=${title.split("-").join("+")}+${type === 'movie' ? release : ""}`}>
                    <div className="testtt" style={{ width: '55px', height: '25px', color: 'white' }}></div>
                </a> : <></>}
                <a rel='noreferrer noopener' className='fgsdasd' target='_blank' href={`https://ext.to/search/?q=${title.split("-").join("+")}${type === 'movie' ? "+" + release : ""}`}>
                    <img alt='' className='netw' src={`https://ext.to/static/img/ext_logo.png`} />
                </a>
                {type === 'movie' ?
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://yts.mx/movies/${title}${type === 'movie' ? "-" + release : ""}`}>
                        <img alt='' style={{ backgroundColor: '#000' }} className='netw' src={`https://yts.mx/assets/images/website/logo-YTS.svg`} />
                    </a> : <></>}
                <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://pahe.ink/?s=${title.split("-").join("+")}`}>
                    <img alt='' className='netw' style={{ padding: '0px' }} src={require('../../logo/pahe.png')} />
                </a>
                <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://psa.wf/?s=${title.split("-").join("+")}`}>
                    <img alt='' className='netw' style={{ padding: '0px' }} src={require('../../logo/psa.png')} />
                </a>
                <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://subsource.net/search/${data.name || data.title} ${type === 'movie' ? release : ""}`}>
                    <img alt='' style={{ backgroundColor: '#000' }} className='netw' src={`https://subsource.net/static/media/logo_full_dark.5addecabd16c37b4c784.png`} />
                </a>
            </div>
        </div>
    )
}

export default Networks