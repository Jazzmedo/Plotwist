import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SeasonContext } from '/src/components/context/SeasonContext'

function SeasPost() {
    let { anime, id, episodes, back, logo } = useContext(SeasonContext)
    let [title, setTitle] = useState('')
    useEffect(() => {
        let x = back.name || episodes.name

        setTitle(manipulateString(x))
    }, [back, anime, episodes.name])

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

    return (
        <>
            <div className="seasonpos">
                <div className="posterrseas">
                    {episodes.name === 'Specials' || episodes.season_number === 0 ? <></> : <div className="votinggg force">{parseInt(episodes.vote_average * 10)}%</div>}
                    <img src={episodes.poster_path ? `https://image.tmdb.org/t/p/w500/${episodes.poster_path}` : `https://image.tmdb.org/t/p/w500/${back.poster_path}`} alt="" />
                </div>
                <div className="posseas">
                    <Link className='preventt' to={`/tv/${id}`}>
                        <img className='seasposttle' src={`https://image.tmdb.org/t/p/w300/${logo}`} alt="" />
                    </Link>
                    <div className="seasvote">
                        <h3 className='seasname'>{episodes.name}</h3>
                    </div>
                </div>
                <h2 className='trendsss trendssss' style={{ fontSize: '2rem', borderTop: '1px solid #fff', paddingTop: '10px' }}>Download Now</h2>
                <div className="flexonlyy watch-links">
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://hexa.watch/details/tv/${id}`}>
                        <img alt='' style={{ backgroundColor: '#000', padding: '15px' }} className='netw' src='https://hexa.watch/hexa-logo.png' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://www.cineby.app/tv/${id}`}>
                        <img alt='' style={{ backgroundColor: '#000', padding: '10px', width: '45px' }} className='netw' src='https://www.cineby.app/logo.png' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://watch.vidora.su/detail/tv/${id}`}>
                        <img alt='' style={{ backgroundColor: '#000', padding: '5px', width: '45px' }} className='netw' src='https://watch.vidora.su/favicon.svg' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://xprime.tv/title/t${id}`}>
                        <img alt='' style={{ backgroundColor: '#fff', padding: '0' }} className='netw' src='https://xprime.tv/logo.webp' />
                    </a>
                    {anime ? <a rel='noreferrer' style={{ backgroundImage: url('/logo/nyaa.png'), padding: '5px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className='fgsdasd nyaa' target='_blank' href={`https://nyaa.si/?q=${title.split("-").join("+")}+S${+episodes.season_number < 10 ? "0" + episodes.season_number : episodes.season_number}`}>
                        <div className="testtt" style={{ width: '55px', height: '25px', color: 'white' }}></div>
                    </a> : <></>}
                    <a className='fgsdasd' href={back.name ? `https://ext.to/search/?q=${back.name.split(" ").join("+")}+S${+episodes.season_number < 10 ? "0" + episodes.season_number : episodes.season_number}` : '#'}>
                        <img alt='' className='netw' src="/logo/ext_logo.png" />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://pahe.ink/?s=${title.split("-").join("+")}`}>
                        <img alt='' className='netw' style={{ padding: '0px' }} src='/.src/logo/pahe.png' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://psa.wf/?s=${title.split("-").join("+")}`}>
                        <img alt='' className='netw' style={{ padding: '0px' }} src='/logo/psa.png' />
                    </a>
                    <a rel='noreferrer' className='fgsdasd' target='_blank' href={`https://subsource.net/subtitles/${title}/season-${episodes.season_number}`}>
                        <img alt='' style={{ backgroundColor: '#fff', padding: '0px' }} className='netw' src='/logo/ss.jpg' />
                    </a>
                </div>
            </div>
        </>
    )
}

export default SeasPost
