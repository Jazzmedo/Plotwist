import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TrendingData({ ele, genre }) {

    let [logo, setLogo] = useState([])

    useEffect(() => {
        getTodos()
    }, [])

    function getTodos() {
        axios.get(`https://api.themoviedb.org/3/${ele.media_type}/${ele.id}/images?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            const firstLogo = res.data.logos.find(element => element.iso_639_1 === "en");
            if (firstLogo) {
                setLogo(firstLogo.file_path);
            }
        });
        axios.get(`https://api.themoviedb.org/3/${ele.media_type}/${ele.id}/images?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            const firstLogo = res.data.logos.find(element => element.iso_639_1 === "en");
            if (firstLogo) {
                setLogo(firstLogo.file_path);
            }
        });
    }

    const backgroundStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${ele.backdrop_path})`
    }

    return (
        <div className="conn clicked" itemType={ele.media_type} id={ele.id} style={backgroundStyle}>
            <Link className='preventt' to={`/${ele.media_type}/${ele.id}`}>
                <div className="backblack"></div>
                <div className="backblack1"></div>
                <img className='logo' src={`https://image.tmdb.org/t/p/w300/${logo}`} alt="" />
                <h3 className='vote'>{parseInt(ele.vote_average * 10)}% <span>({(ele.vote_count / 1000 > 1 ? `${(ele.vote_count / 1000).toFixed(2)}K` : ele.vote_count)})</span></h3>
                <div className="genres">
                    {genre.map(te => (
                        te ? <div key={te} className="genre">{te}</div> :<></>
                    ))}
                    {/* <a target='_blank' href={`https://www.themoviedb.org/${ele.media_type}/${ele.id}`}><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="" /></a> */}
                </div>
            </Link>
        </div>
    )
}

export default TrendingData