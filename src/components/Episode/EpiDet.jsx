import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import EpiPost from './EpiPost'
import EpiCast from './EpiCast'
import Separator from '/src/components/Home/Separator'
import Loading from '/src/components/Loading/Loading'
import './epi.css'
import '/src/components/Item/item.css'
import { EpiContext } from '/src/components/context/EpiContext'

function EpiDet() {
    let { id, sid, eid } = useParams()
    let [episode, setEpisode] = useState([])
    let [back, setBack] = useState([])
    let [cast, setCast] = useState([])
    let [logo, setLogo] = useState([])
    const [anime, setAnime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.getElementById("Nv").scrollIntoView({ behavior: "smooth" });
        getData()
        if (back.name && episode.name) {
            document.title = `Plotwist | ${back.name} | ${episode.name}`;
        }

        if (back.backdrop_path) {
            document.body.style.cssText = `background-image:url('https://image.tmdb.org/t/p/original/${back.backdrop_path}')`
        }
        
        // Make footer responsive
        const updateFooterStyle = () => {
            const footer = document.querySelector('footer');
            if (footer) {
                if (window.innerWidth <= 768) {
                    footer.style.cssText = "box-shadow: 0px 0px 20px 15px rgba(0, 0, 0, 0.5);margin-top: 20px;";
                } else {
                    footer.style.cssText = "box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);margin-top: 0px;";
                }
            }
        };
        
        updateFooterStyle();
        window.addEventListener('resize', updateFooterStyle);
        
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        
        return () => {
            window.removeEventListener('resize', updateFooterStyle);
            document.body.style.cssText = `background-image:url('./back.jpg')`
        };
    }, [back.name, episode.name, back.backdrop_path, id, sid, eid])

    function getData() {
        // ... existing code ...
    }

    if (episode && back) {
        return (
            <>
                <Loading isLoading={isLoading} />
                {!isLoading && <>
                    <EpiContext.Provider value={{ anime, setAnime, id, sid, eid, episode, setEpisode, back, setBack, cast, setCast, logo }}>
                        <div className="epiAll responsive-container">
                            <div className="epidet">
                                <EpiPost />
                                <div className="epipdetails">
                                    <h1 className='trendsss white more'>{episode.name}</h1>
                                    <h3>
                                        <span>Episode {episode.episode_number}</span>
                                        <span>Season {episode.season_number}</span>
                                        <span>{episode.air_date}</span>
                                        <span>{episode.runtime >= 60 ? `${parseInt(episode.runtime / 60)}h` : ""} {episode.runtime % 60 !== 0 ? `${episode.runtime % 60}m` : ""}</span>
                                    </h3>
                                    <div className={`paragraph`} onClick={(e) => e.currentTarget.classList.toggle('clicked')}>
                                        {episode.overview}
                                    </div>
                                </div>
                                    <Separator/>
                            </div>
                            <h1>hi</h1>
                            <EpiCast />
                        </div>
                    </EpiContext.Provider>
                </>}
            </>
        )
    }
}

export default EpiDet