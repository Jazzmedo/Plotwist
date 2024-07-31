import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Separator from '../Home/Separator'

function KnownFor(people) {
    let [credits, setCredits] = useState([])

    useEffect(() => {
        if (people.id != undefined && people.known != undefined) {
            getKnownFor(people)
        }
    }, [people])

    function getKnownFor(people) {
        axios.get(`https://api.themoviedb.org/3/person/${people.id}/combined_credits?api_key=80db2c88f978a7c08fd8b402180ede6e`).then(res => {
            if (res && people.known) {
                if (people.known == "Acting") {
                    // Filter out characters named "Self" and movies with order smaller than 3
                    const filteredCast = res.data.cast.filter(item =>
                        !item.character.includes("Self") &&
                        !(item.media_type === 'movie' && item.order < 0)
                    );

                    // Group by TV show or movie
                    const grouped = filteredCast.reduce((acc, item) => {
                        const key = item.media_type === 'tv' ? item.original_name : item.original_title;
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(item);
                        return acc;
                    }, {});

                    // Select the most popular character from each show or movie
                    const mostPopular = Object.values(grouped).map(items => {
                        return items.reduce((prev, current) => {
                            const prevScore = prev.popularity * prev.vote_average * prev.vote_count;
                            const currentScore = current.popularity * current.vote_average * current.vote_count;
                            return (currentScore > prevScore) ? current : prev;
                        });
                    });

                    // Sort by popularity and slice the top 10
                    setCredits(mostPopular.sort((a, b) => {
                        return (b.popularity * b.vote_average * b.vote_count) - (a.popularity * a.vote_average * a.vote_count);
                    }).slice(0, 10))
                }
                if (people.known == "Directing") {
                    setCredits(res.data.crew.filter(item => item.job == "Director").sort((a, b) => b.popularity * b.vote_average * b.vote_count - a.popularity * a.vote_average * a.vote_count).slice(0, 10))
                }
                if (people.known == "Sound") {
                    setCredits(res.data.crew.filter(item => item.job == "Original Music Composer").sort((a, b) => b.popularity * b.vote_average * b.vote_count - a.popularity * a.vote_average * a.vote_count).slice(0, 10))
                }
            }
        })
    }
    console.log(credits)
    return (
        <>
            <Separator />
            <h1 className='trendsss trendssss'>Known For</h1>
            <div className="allmov">
                {credits ? credits.map((credit) => (
                    <Link key={credit.id} to={`/${credit.media_type}/${credit.id}`}>
                        {/* {console.log(credit)} */}
                        <div key={credit.id} className='movcont'>
                            <div className="votinggg force another">{parseInt(credit.vote_average * 10)}%</div>
                            <img src={credit.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${credit.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png`} alt="" />
                            <h4 className='movname'>{credit.original_title || credit.original_name}</h4>
                            {people.known == "Acting" ? <h4 className='movchar'>{credit.character}</h4> : <></>}
                        </div>
                    </Link>
                )) : <></>}
            </div>
        </>
    )
}

export default KnownFor