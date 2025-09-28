import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { EpiContext } from '/src/components/context/EpiContext'

function EpiPost() {
    let { anime, id, sid, eid, episode, back, logo } = useContext(EpiContext)
    let [title, setTitle] = useState('')
    useEffect(() => {
        let x = back.name || episode.name

        setTitle(manipulateString(x))
    }, [back, anime, episode.name])

    function manipulateString(str = "", by = "-") {
        // ... existing code ...
        return str;
    }

    return (
        <>
            <div className="epiposter">
                <div className="conss">
                    <div className="votinggg force">{parseInt(episode.vote_average * 10)}%</div>
                    <img className='epiimg' src={episode.still_path ? `https://image.tmdb.org/t/p/w500/${episode.still_path}` : '/src/components/Season/asdfs.jpg'} alt="" />
                </div>
                <div className="logogga">
                    <Link className='preventt' to={`/Plotwist/tv/${id}`}>
                        <img src={`https://image.tmdb.org/t/p/w300/${logo}`} width={250} alt="" />
                    </Link>
                </div>
                <div className="flexonlyy watch-links">
                    {anime ? <a rel='noreferrer' style={{ backgroundImage: url('/logo/nyaa.png'), padding: '5px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className='fgsdasd nyaa' target='_blank' href={`https://nyaa.si/?q=${title.split("-").join("+")}+${+episode.episode_number < 10 ? "0" + episode.episode_number : episode.episode_number}`}>
                        <div className="testtt" style={{ width: '55px', height: '25px', color: 'white' }}></div>
                    </a> : <></>}
                    <a className='fgsdasd' href={back.name ? `https://ext.to/search/?q=${back.name.split(" ").join("+")}+S${+episode.season_number < 10 ? "0" + episode.season_number : episode.season_number}E${+episode.episode_number < 10 ? "0" + episode.episode_number : episode.episode_number}` : '#'}>
                        <img alt='' className='netw' src="/logo/ext_logo.png" />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://pahe.ink/?s=${title.split("-").join("+")}`}>
                        <img alt='' className='netw' style={{ padding: '0px' }} src='/.src/logo/pahe.png' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://psa.wf/?s=${title.split("-").join("+")}`}>
                        <img alt='' className='netw' style={{ padding: '0px' }} src='/logo/psa.png' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://subsource.net/subtitles/${title}/season-${episode.season_number}/episode-${episode.episode_number}`}>
                        <img alt='' style={{ backgroundColor: '#fff', padding: '0px' }} className='netw' src='/logo/ss.jpg' />
                    </a>
                </div>
            </div>
        </>
    )
}

export default EpiPost