import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Details from './Details'
import Loading from '../Loading/Loading'
import Poster from './Poster'
import Cast from './Cast'
import { DetailsContext } from '../context/DetailsContextProvider'

function Movie() {

    let [details, setData] = useState([])
    let [imdb, setImdb] = useState([])
    let { id } = useParams()
    let { type } = useParams()
    let [logo, setLogo] = useState("")
    let [cast, setCast] = useState([])
    let [dir, setDir] = useState([])
    let [sound, setSound] = useState([])
    let [seasons, setSeason] = useState([])
    let [last, setLast] = useState([])
    let [similar, setSimilar] = useState([])
    const [anime, setAnime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        // getDet()
        // setAnime(false)
        getLogo()
        document.getElementById("Nv").scrollIntoView({ behavior: "smooth" });
        if (type === "tv") {
            setLast(details.last_episode_to_air)
            setSeason(details.seasons)
        }
        if (details && imdb && similar) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
        else{
            setIsLoading(true)
        }
        // console.log(cast)
        // console.log(details.genres)
        document.querySelector('footer').style.cssText = "box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);margin-top: 0px;"
    }, [type, id, imdb, isLoading,anime])

    function getLogo() {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((ress) => {
            setData(ress.data)
            setImdb(ress.data.imdb_id)
            if (ress.data.imdb_id !== null) {
                setImdb(ress.data.imdb_id)
            }
            // Check if genres include Animation and language is Japanese or Chinese
            const isAnimation = ress.data.genres.some(genre => genre.name === "Animation");
            const isJapaneseOrChinese = ["ja", "zh","kr"].includes(ress.data.original_language);
            if (isAnimation && isJapaneseOrChinese) {
                setAnime(true);
            }
            else{
                setAnime(false)
            }
            // console.log(anime)
        })
        if (type === "tv") {
            axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
                setImdb(res.data.imdb_id)
            })
        }

    }
    // console.log(details)
    if (details.backdrop_path) {
        document.body.style.cssText = `background-image:url('https://image.tmdb.org/t/p/original/${details.backdrop_path}')`
    }



    // console.log(details.backdrop_path)
    document.title = `Plotwist | ${details.title || details.name} ${type === 'movie' ? "("+(details.release_date ? details.release_date.split("-")[0] : "Unknown Year")+")" : ""}`;

    return (
        <>
            <Loading isLoading={isLoading} />
            {!isLoading && <>
                <DetailsContext.Provider value={{ details, id, type, imdb, logo, setLogo, cast, dir, sound, setCast, setDir, setSound, seasons, setSeason, last, setLast, similar, setSimilar,anime,setAnime }}>
                    <div className="alll">
                        <div className="flexonlyys">
                            <div className="grad"> </div>
                            <div className="grad grad2"> </div>
                            <Details />
                            <Poster />
                        </div>
                        <Cast data={details} id={id} type={type} />
                    </div>
                </DetailsContext.Provider>
            </>}
        </>
    )
}

export default Movie