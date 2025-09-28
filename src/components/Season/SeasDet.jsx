import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SeasPost from './SeasPost'
import SeasCast from './SeasCast'
import Episode from './SeasEpis'
import Loading from '/src/components/Loading/Loading'
import './season.css'
import '/src/components/Item/item.css'
import { SeasonContext } from '/src/components/context/SeasonContext'

function SeasDet() {
    let { id, sid } = useParams()
    let [episodes, setEpisodes] = useState([])
    let [back, setBack] = useState([])
    let [lengthh, setLength] = useState([])
    let [cast, setCast] = useState([])
    let [logo, setLogo] = useState([])
    let [seasnum, setSeasnum] = useState([])
    const [anime, setAnime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.getElementById("Nv").scrollIntoView({ behavior: "smooth" });
        getData()
        if (back.name && episodes.name) {
            document.title = `Plotwist | ${back.name} | ${episodes.name}`;
        }

        if (episodes.episodes) {
            setLength(episodes.episodes.length)
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
        };
    }, [back.name, episodes.name, seasnum, back.backdrop_path])

    function getData() {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${sid}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            setEpisodes(res.data)
            setSeasnum(res.data.season_number)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(ress => {
            setBack(ress.data)
            const isAnimation = ress.data.genres.some(genre => genre.name === "Animation");
            const isJapaneseOrChinese = ["ja", "zh","kr"].includes(ress.data.original_language);
            if (isAnimation && isJapaneseOrChinese) {
                setAnime(true);
            }
            else {
                setAnime(false)
            }
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            const firstLogo = res.data.logos.find(element => element.iso_639_1 === "ar") ||
                res.data.logos.find(element => element.iso_639_1 === episodes.original_language) ||
                res.data.logos.find(element => element.iso_639_1 === "en") ||
                res.data.logos[0];
            if (firstLogo) {
                setLogo(firstLogo.file_path);
            }
        });
    }
    // console.log(back)
    // console.log(back)
    if (episodes && back) {

        return (
            <>
                <Loading isLoading={isLoading} />
                {!isLoading && <>
                    <SeasonContext.Provider value={{ anime, setAnime, id, sid, episodes, setEpisodes, back, setBack, lengthh, setLength, cast, setCast, logo, seasnum }}>
                        <div className="allseas responsive-container">
                            <div className="seasondet">
                                <SeasPost />
                                <div className="sep"> </div>
                                <Episode />
                            </div>
                            <SeasCast />
                        </div>
                    </SeasonContext.Provider>
                </>}
            </>
        )
    }
}

export default SeasDet