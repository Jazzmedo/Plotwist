import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import Separator from '../Home/Separator'
import { useParams, Link } from 'react-router-dom'
import { EpisodeContext } from '../context/EpisodeContext'
import Loading from '../Loading/Loading'
import './epi.css'

function SingleE() {
    let { id } = useParams()
    let { sid } = useParams()
    let { eid } = useParams()

    let [episodes, setEpisodes] = useState([])
    let [tv, setTv] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    let [logo, setLogo] = useState("")
    const [anime, setAnime] = useState(false);





    useEffect(() => {
        document.getElementById("Nv").scrollIntoView({ behavior: "smooth" });
        getEpisodes()
    }, [])

    function getEpisodes() {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${sid}/episode/${eid}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            setEpisodes(res.data)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(response => {
            setTv(response.data)
            const isAnimation = response.data.genres.some(genre => genre.name === "Animation");
            const isJapaneseOrChinese = ["ja", "zh"].includes(response.data.original_language);
            if (isAnimation && isJapaneseOrChinese) {
                setAnime(true);
            }
            else {
                setAnime(false)
            }
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            console.log(res.data.logos)
            const firstLogo = res.data.logos.find(element => element.iso_639_1 === "ar") ||
                res.data.logos.find(element => element.iso_639_1 === tv.original_language) ||
                res.data.logos.find(element => element.iso_639_1 === "en") ||
                res.data.logos[0];
            if (firstLogo) {
                setLogo(firstLogo.file_path);
            }
        });

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    return (
        <>
            {/* {console.log(episodes)} */}
            {console.log(tv)}
            <Loading isLoading={isLoading} />
            {!isLoading && <>
                <EpisodeContext.Provider value={{ id, sid, eid, episodes, tv }}>
                    <div className="epiAll">
                        <div className="epidet">
                            <div className="epiposter">
                                <div className="conss">
                                    <img className='epiimg' src={`https://image.tmdb.org/t/p/w500/${episodes.still_path}`} alt="" />
                                    <div className="votinggg force">{parseInt(episodes.vote_average * 10)}%</div>
                                </div>
                                <Link className='logogga' to={`/Plotwist/tv/${id}`}><img className='seasposttle' src={`https://image.tmdb.org/t/p/w300/${logo}`} width={250} alt="" /></Link>
                                <h2 className='trendsss trendssss' style={{ fontSize: '2rem', marginTop: '0rem', borderTop: '1px solid #ffddc9', paddingTop: '10px' }}>Watch Now</h2>
                                <div className="flexonlyy">
                                    {anime ? <a rel='noreferrer' style={{ backgroundImage: `url('https://i.imgur.com/0gVdwjP.png')`, padding: '5px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className='fgsdasd nyaa' target='_blank' href={`https://nyaa.si/?q=${tv.name.split("-").join("+")}+S${+sid < 10 ? "0" + sid : sid}+E${+episodes.episode_number < 100 ? "00" + eid : eid}`}>
                                        <div className="testtt" style={{ width: '55px', height: '25px', color: 'white' }}></div>
                                    </a> : <></>}

                                    <a className='fgsdasd' href={tv.name ? `https://ext.to/search/?q=${tv.name.split(" ").join("+")}+S${+sid < 10 ? "0" + sid : sid}+E${+eid < 10 ? "0" + eid : eid}` : '#'}>
                                        <img alt="" className='netw' src={`https://ext.to/static/img/ext_logo.png`} />
                                    </a>
                                </div>
                            </div>
                            <div className="epipdetails">
                                <h1 className='trendsss white more'>{episodes.name}</h1>
                                <h3><span>Season : {episodes.season_number}</span>
                                    <span>Episode : {episodes.episode_number}</span>
                                    <span>Duration : {episodes.runtime >= 60 ? `${parseInt(episodes.runtime / 60)}h` : ""} {episodes.runtime % 60 !== 0 ? `${episodes.runtime % 60}m` : ""}</span>
                                    <span>Air Date : {episodes.air_date}</span></h3>
                                <p className='paragraph'>{episodes.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className='widthoo'>
                        <Separator />
                        <h1 className='trendsss trendssss'>Cast</h1>
                        <div className="allcastingg">
                            {episodes.guest_stars ? episodes.guest_stars.slice(0, 10).map((ele) => {
                                return <Link key={ele.id} to={`/Plotwist/person/${ele.id}`}>
                                    <div key={ele.id} className='castcontt'> <img src={ele.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${ele.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} alt="" />
                                        <h4 className='castnamee'>{ele.name}</h4>
                                        <h4 className='castcharr'>{ele.character}</h4>
                                    </div>
                                </Link>
                            }) : <></>}
                        </div>
                    </div>
                </EpisodeContext.Provider >
            </>}
        </>
    )
}

export default SingleE
