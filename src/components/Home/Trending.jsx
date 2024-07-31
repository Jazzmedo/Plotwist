import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import TrendingData from './TrendingData';
import { HomeContext } from '../context/HomeContext';



// Make a request for a user with a given ID

const Trending = () => {
    let { data, dataa, dataaa, period } = useContext(HomeContext)

    useEffect(() => {
    }, [])

    // console.log(dataaa)
    function mergeGenres(obj1, obj2) {
        const mergedGenres = {};

        // Iterate through obj1, adding genres to mergedGenres
        for (const genre of obj1) {
            mergedGenres[genre.id] = genre;
        }

        // Iterate through obj2, adding unique genres to mergedGenres
        for (const genre of obj2) {
            if (!mergedGenres.hasOwnProperty(genre.id)) {
                // mergedGenres[genre.id] = genre;
                mergedGenres[genre.id] = genre;
            }
        }

        // Convert the mergedGenres object back to an array of genres
        return Object.values(mergedGenres);
    }
    let finalObject = mergeGenres(dataa, dataaa);
    console.log(finalObject)
    return (
        <>
            <h1 className='trendsss'>{period == "day" ? "Today" : "Weekly"} Trendings</h1>
            <div className="containerr boxedd">
                {data.map(ele => {
                    let genre = ele.genre_ids.map(id => {
                        let genreObj = finalObject.find(genre => genre.id === id);
                        // console.log(genreObj)
                        return genreObj ? genreObj.name : '';
                    });
                    return (
                        <TrendingData ele={ele} genre={genre} />
                    )
                })}
            </div>
        </>
    )
}

export default Trending;