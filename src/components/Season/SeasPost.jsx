import React, { useContext, useState, useEffect } from 'react'
import { SeasonContext } from '../context/SeasonContext'
import { Link } from 'react-router-dom'

function SeasPost() {
    let { id, episodes, back, logo } = useContext(SeasonContext)
    let [title, setTitle] = useState('')
    useEffect(() => {
        let x = back.name || episodes.name

        setTitle(manipulateString(x))
    }, [back])

    function manipulateString(str = "") {
        str = str.toLowerCase()
        // Replace spaces with hyphens
        str = str.replace(/\s+/g, '-');
        str = str.replace(":", '');
        str = str.replace(",", '');

        // Replace '&' with 'and'
        str = str.replace('&', 'and');
        str = str.replace("--", '-');
        str = str.replace("---", '-');
        return str;
    }

    console.log(episodes)
    return (
        <>
            <div className="seasonpos">
                <div className="posterrseas">
                    {episodes.name == 'Specials' || episodes.season_number == 0 ? <></> : <div className="votinggg force">{parseInt(episodes.vote_average * 10)}%</div>}
                    <img src={episodes.poster_path ? `https://image.tmdb.org/t/p/w500/${episodes.poster_path}` : `https://image.tmdb.org/t/p/w500/${back.poster_path}`} alt="" />
                </div>
                <div className="posseas">
                    <Link className='preventt' to={`/tv/${id}`}><img className='seasposttle' src={`https://image.tmdb.org/t/p/w300/${logo}`} width={250} alt="" /></Link>
                    <div className="seasvote">
                        <h3 className='seasname'>{episodes.name}</h3>
                    </div>
                </div>
                <h2 className='trendsss trendssss' style={{ fontSize: '2rem', borderTop: '1px solid #fff', paddingTop: '10px' }}>Watch Now</h2>
                <div className="flexonlyy">
                    <a className='fgsdasd' href={back.name ? `https://ext.to/search/?q=${back.name.split(" ").join("+")}+S${+episodes.season_number < 10 ? "0" + episodes.season_number : episodes.season_number}` : '#'}>
                        <img className='netw' src={`https://ext.to/static/img/ext_logo.png`} />
                    </a>
                    <a className='fgsdasd' target='_blank' href={`https://subsource.net/subtitles/${title}/season-${episodes.season_number}`}>
                        <img style={{ backgroundColor: '#000' }} className='netw' src={`https://subsource.net/static/media/logo_full_dark.5addecabd16c37b4c784.png`} />
                    </a>
                    <a className='fgsdasd' target='_blank' href={`https://pahe.ink/?s=${title.split("-").join("+")}`}>
                        <img className='netw' style={{ padding: '0px' }} src={require('../../logo/pahe.png')} />
                    </a>
                    <a className='fgsdasd' target='_blank' href={`https://psa.wf/?s=${title.split("-").join("+")}`}>
                        <img className='netw' style={{ padding: '0px' }} src={require('../../logo/psa.png')} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default SeasPost
