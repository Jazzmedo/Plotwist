import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import KnownFor from './KnownFor';
import './people.css';

function People() {
    let [people, setPeople] = useState([]);
    let { pid } = useParams();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        document.getElementById("Nv").scrollIntoView({ behavior: "smooth" });

        getPeople();
    }, [pid, isLoading]);

    function getPeople() {
        axios.get(`https://api.themoviedb.org/3/person/${pid}?api_key=80db2c88f978a7c08fd8b402180ede6e`)
            .then(res => {
                setPeople(res.data);
            });
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    const handleParagraphClick = () => {
        const x = document.querySelector('p');
        if (x) {
            x.classList.toggle('clicked');
        }
    };

    document.body.style.cssText = `background-image:url('${require('../../back.jpg')}')`
    document.title = `Plotwist | ${people.title || people.name}`;

    // console.log(people.known_for_department)

    return (
        <>
            <Loading isLoading={isLoading} />
            {!isLoading && <>
                <div className="peopleAll">
                    <div className="peopledet">
                        <div className="posterpeople">
                            <img src={`https://image.tmdb.org/t/p/w500/${people.profile_path}`} alt="" />
                        </div>
                        <div className="pdetails">
                            <h1 className='trendsss trendssss' style={{ color: '#ffddc9' }}>{people.name}</h1>
                            <h3><span>Known For : {people.known_for_department == "Sound" ? "Music Composer" : people.known_for_department == "Acting" ? "Actor" : "Director"}</span><span>Birthday : {people.birthday}</span><span>Place of Birth : {people.place_of_birth}</span></h3>
                            <p className='paragraph' onClick={handleParagraphClick}>{people.biography}</p>
                            <div className="redirect">
                                <a target='_blank' href={`https://www.themoviedb.org/person/${people.id}`}><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="" /></a>
                                <a target='_blank' href={`https://www.imdb.com/name/${people.imdb_id}`}><img src="https://imgur.com/b1d2LOV.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <KnownFor id={pid} known={people.known_for_department} />
                </div>
            </>}
        </>
    );
}

export default People;