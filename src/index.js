import React from 'react';
import Movie from "./components/Item/Movie"
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import App from './App';
import NotFound from './components/notfound/NotFound';
import SeasDet from './components/Season/SeasDet';
import SingleE from './components/Episode/SingleE';
import Home from './components/Home/Home'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import People from './components/people/People';
import MovieSec from './components/movieSection/MovieSec';


const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/:type/:id",
                element: <Movie />
            },
            {
                path: "/Movies",
                element: <MovieSec type={"movie"} />
            },
            {
                path: "/learning",
                element: <Home />
            },
            {
                path: "/TV",
                element: <MovieSec type={"tv"} />
            },
            {
                path: "/tv/:id/season/:sid",
                element: <SeasDet />
            },
            {
                path: "/tv/:id/season/:sid/episode/:eid",
                element: <SingleE />
            },
            {
                path: "",
                element: <Home />
            },
            {
                path: "/person/:pid",
                element: <People />
            },
            {
                path: "/*",
                element: <NotFound />
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);