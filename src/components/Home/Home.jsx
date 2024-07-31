import React, { useEffect, useState } from 'react'
import Trending from "./Trending"
import Separator from "./Separator"
import NowPlaying from "./NowPlaying"
import { HomeContext } from '../context/HomeContext'
import axios from 'axios'
import Loading from '../Loading/Loading'

function Home() {
    let [data, setData] = useState([])
    let [dataa, setDataa] = useState([])
    let [dataaa, setDataaa] = useState([])
    let [period, setPeriod] = useState("week")
    let [tv, setTv] = useState([])
    let [movie, setMovie] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Plotwist";
        Array.from(document.querySelectorAll('.preventt')).map(each => {
            each.addEventListener('click', () => {
                document.getElementById('dropdownMenu').style.display = 'none'
            })
        })
        getTodos()
    }, [])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function getTodos() {
        axios.get(`https://api.themoviedb.org/3/trending/all/${period}?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            let x = shuffle(res.data.results)
            setData(Object.values(x).slice(0, 10))
            // console.log(x)
        })
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=80db2c88f978a7c08fd8b402180ede6e").then((ress) => {
            setDataa(ress.data.genres)
        })
        axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=80db2c88f978a7c08fd8b402180ede6e").then((resss) => {
            setDataaa(resss.data.genres)
            // console.log(dataaa)
        })
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            setMovie(res.data.results.slice(0, 8))
        })
        axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=80db2c88f978a7c08fd8b402180ede6e`).then((res) => {
            setTv(res.data.results.slice(0, 8))
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }

    document.body.style.cssText = `background-image:url('${require("../../back.jpg")}')`
    // console.log(movie)

    return (
        <>
            <Loading isLoading={isLoading} />
            {!isLoading && <>
                <HomeContext.Provider value={{ data, setData, dataa, setDataa, dataaa, setDataaa, period, movie, tv }}>
                    <Trending />
                    <Separator />
                    <NowPlaying data={movie} type="movie" query="now_playing" />
                    <Separator />
                    <NowPlaying data={tv} type="tv" query="on_the_air" />
                    <Separator />
                </HomeContext.Provider>
            </>}
        </>
    )
}

export default Home
