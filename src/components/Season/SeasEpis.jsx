import React, { useContext } from 'react'
import { SeasonContext } from '../context/SeasonContext'
import { Link } from "react-router-dom"


function SeasEpis() {
    let { episodes, lengthh, id, sid } = useContext(SeasonContext)

    return (
        <>
            <div className="episodess">
                <h3 key={lengthh} className='epish2'>Episodes : {lengthh}</h3>
                <div className="cardsss">
                    {Array.isArray(episodes.episodes) && episodes.episodes.map((item) => {
                        // console.log(item)
                        return (<>

                            <Link className="oncardd" to={`/tv/${id}/season/${sid}/episode/${item.episode_number}`}>
                                <div key={item.id} >
                                    <img className="posterrr" src={item.still_path ? `https://image.tmdb.org/t/p/w500/${item.still_path}` : require(`./asdfs.jpg`)} />
                                    <div className="numberep">{item.episode_number}</div>
                                    <div className="voteep">{parseInt(item.vote_average * 10)}%</div>
                                    <div className="episdets">
                                        <h5 id='epnammma'>{item.name}</h5>
                                        <div className="septer"></div>
                                        <div className="detsdets">
                                            <h6>{item.air_date}</h6>
                                            <h6>{item.runtime >= 60 ? `${parseInt(item.runtime / 60)}h` : ""} {item.runtime % 60 != 0 ? `${item.runtime % 60}m` : ""}</h6>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>)
                    })}
                </div>
            </div>

        </>
    )
}

export default SeasEpis
