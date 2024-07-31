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
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    return (
        <>
            {console.log(episodes)}
            {/* {console.log(tv)} */}
            <Loading isLoading={isLoading} />
            {!isLoading && <>
                <EpisodeContext.Provider value={{ id, sid, eid, episodes, tv }}>
                    <div className="epiAll">
                        <div className="epidet">
                            <div className="epiposter">
                                <div className="conss">
                                    <img src={`https://image.tmdb.org/t/p/w500/${episodes.still_path}`} alt="" />
                                    <div className="votinggg force">{parseInt(episodes.vote_average * 10)}%</div>
                                </div>
                                <h2 className='trendsss trendssss' style={{ fontSize: '2rem', marginTop: '3rem', borderTop: '1px solid #ffddc9', paddingTop: '10px' }}>Watch Now</h2>
                                <div className="flexonlyy">
                                    <a className='fgsdasd' href={tv.name ? `https://ext.to/search/?q=${tv.name.split(" ").join("+")}+S${+sid < 10 ? "0" + sid : sid}+E${+eid < 10 ? "0" + eid : eid}` : '#'}>
                                        <img className='netw' src={`https://ext.to/static/img/ext_logo.png`} />
                                    </a>
                                </div>
                            </div>
                            <div className="epipdetails">
                                <h1 className='trendsss white more'>{episodes.name}</h1>
                                <h3><span>Season : {episodes.season_number}</span>
                                    <span>Episode : {episodes.episode_number}</span>
                                    <span>Duration : {episodes.runtime >= 60 ? `${parseInt(episodes.runtime / 60)}h` : ""} {episodes.runtime % 60 != 0 ? `${episodes.runtime % 60}m` : ""}</span>
                                    <span>Air Date : {episodes.air_date}</span></h3>
                                <p className='paragraph'>{episodes.overview}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className='widthoo'>
                            <h1 className='trendsss trendssss'>Cast</h1>
                            <div className="allcastingg">
                                {episodes.guest_stars ? episodes.guest_stars.slice(0, 10).map((ele) => {
                                    return <Link key={ele.id} to={`/person/${ele.id}`}>
                                        <div key={ele.id} className='castcontt'> <img src={ele.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${ele.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} alt="" />
                                            <h4 className='castnamee'>{ele.name}</h4>
                                            <h4 className='castcharr'>{ele.character}</h4>
                                        </div>
                                    </Link>
                                }) : <></>}
                            </div>
                        </div>
                    </div>
                </EpisodeContext.Provider >
            </>}
        </>
    )
}

export default SingleE
