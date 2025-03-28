import React, { useContext, useState, useEffect } from 'react'
import { SeasonContext } from '../context/SeasonContext'
import { Link } from 'react-router-dom'

function SeasPost() {
    let { anime, id, episodes, back, logo } = useContext(SeasonContext)
    let [title, setTitle] = useState('')
    useEffect(() => {
        let x = back.name || episodes.name

        setTitle(manipulateString(x))
    }, [back, anime])

    function manipulateString(str = "", by = "-") {
        str = str.toLowerCase()
        // Replace spaces with hyphens
        str = str.replace(/\s+/g, by);
        str = str.replace(":", '');
        str = str.replace(",", '');
        str = str.replace(".", '');
        str = str.replace("·", '');
        str = str.replace("·", '');
        str = str.replace("·", '');

        // Replace '&' with 'and'
        str = str.replace('&', 'and');
        str = str.replace("--", by);
        str = str.replace("---", by);
        str = str.replace("----", by);
        str = str.replace("·", '');
        return str;
    }

    console.log(episodes)
    return (
        <>
            <div className="seasonpos">
                <div className="posterrseas">
                    {episodes.name === 'Specials' || episodes.season_number === 0 ? <></> : <div className="votinggg force">{parseInt(episodes.vote_average * 10)}%</div>}
                    <img src={episodes.poster_path ? `https://image.tmdb.org/t/p/w500/${episodes.poster_path}` : `https://image.tmdb.org/t/p/w500/${back.poster_path}`} alt="" />
                </div>
                <div className="posseas">
                    <Link className='preventt' to={`/Plotwist/tv/${id}`}><img className='seasposttle' src={`https://image.tmdb.org/t/p/w300/${logo}`} width={250} alt="" /></Link>
                    <div className="seasvote">
                        <h3 className='seasname'>{episodes.name}</h3>
                    </div>
                </div>
                <h2 className='trendsss trendssss' style={{ fontSize: '2rem', borderTop: '1px solid #fff', paddingTop: '10px' }}>Watch Now</h2>
                <div className="flexonlyy">
                    {anime ? <a rel='noreferrer' style={{ backgroundImage: `url('${require('../../logo/nyaa.png')}')`, padding: '5px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className='fgsdasd nyaa' target='_blank' href={`https://nyaa.si/?q=${title.split("-").join("+")}+S${+episodes.season_number < 10 ? "0" + episodes.season_number : episodes.season_number}`}>
                        <div className="testtt" style={{ width: '55px', height: '25px', color: 'white' }}></div>
                    </a> : <></>}
                    <a className='fgsdasd' href={back.name ? `https://ext.to/search/?q=${back.name.split(" ").join("+")}+S${+episodes.season_number < 10 ? "0" + episodes.season_number : episodes.season_number}` : '#'}>
                        <img alt='' className='netw' src={require("../../logo/ext_logo.png")} />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://pahe.ink/?s=${title.split("-").join("+")}`}>
                        <img alt='' className='netw' style={{ padding: '0px' }} src={require('../../logo/pahe.png')} />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://psa.wf/?s=${title.split("-").join("+")}`}>
                        <img alt='' className='netw' style={{ padding: '0px' }} src={require('../../logo/psa.png')} />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://subsource.net/subtitles/${title}/season-${episodes.season_number}`}>
                        <img alt='' style={{ backgroundColor: '#fff', padding: '0px' }} className='netw' src={require('../../logo/ss.jpg')} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default SeasPost
