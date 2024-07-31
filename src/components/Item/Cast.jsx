import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Seasons from './Seasons'
import Separator from '../Home/Separator'
import Similar from './Similar'
import {DetailsContext} from '../context/DetailsContextProvider.jsx'


function Cast() {
    let {id,type,cast, setCast,dir, setDir,sound, setSound}=useContext(DetailsContext)
    useEffect(() => {
        getcast()
    }, [type, id])

    function getcast() {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            setCast(res.data)
            const firstdir = res.data.crew.find(element => element.job === "Director");
            if (firstdir) {
                setDir(firstdir);
            }
            const firstsound = res.data.crew.find(ele => ele.job == "Original Music Composer");
            if (firstsound) {
                setSound(firstsound);
            }
        })
    }
    // console.log((ele))
    return (
        <>
            <div className="allcast">
                <Separator/>
                <div className='widtho'>
                    <h1 className='casth'>Cast</h1>
                    <div className="allcasting flexing">
                        {Array.isArray(cast.cast) ? cast.cast.slice(0, 8).map((ele) => {

                            return <Link key={ele.id} to={`/person/${ele.id}`}>
                                <div key={ele.id} className='castcont'> <img src={ele.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${ele.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} alt="" />
                                    <h4 className='castname'>{ele.name}</h4>
                                    <h4 className='castchar'>{ele.character}</h4>
                                </div>
                            </Link>
                        }) : <></>}
                    </div>
                    {type == "movie" ? <>
                        <div className="crew flexing">
                            <div className='castcont crew must obey'>
                                <h1 className='casth'>Director</h1>
                                <Link to={`/person/${dir.id}`}>
                                    <img src={dir.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${dir.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} alt="" />
                                    <h4 className='castname'>{dir.name}</h4>
                                </Link>
                            </div>
                            {sound.length === 0 ? <></> : <div className='castcont crew must obey'>
                                <h1 className='casth'>Music Composer</h1>
                                <Link to={`/person/${sound.id}`}>
                                    <img src={sound.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${sound.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} alt="" />
                                    <h4 className='castname'>{sound.name}</h4>
                                </Link>
                            </div>}

                        </div>
                    </>
                        : <></>}
                </div>
                {type == "tv" ? <Seasons></Seasons> : <></>}
                <Separator/>
                <Similar></Similar>
            </div>

        </>
    )
}

export default Cast
