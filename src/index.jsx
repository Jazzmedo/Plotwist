import React from 'react';
import Movie from "./components/Item/Movie"
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Link } from 'react-router-dom';
import NotFound from './components/notfound/NotFound';
import SeasDet from './components/Season/SeasDet';
import SingleE from './components/Episode/SingleE';
import Home from './components/Home/Home'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import People from './components/people/People';
import MovieSec from './components/movieSection/MovieSec';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/Plotwist",
        element: <App />,
        children: [
            {
                path: "/Plotwist/:type/:id",
                element: <Movie />
            },
            {
                path: "/Plotwist/Movies",
                element: <MovieSec type={"movie"} />
            },
            {
                path: "/Plotwist/",
                element: <Home />
            },
            {
                path: "/Plotwist/TV",
                element: <MovieSec type={"tv"} />
            },
            {
                path: "/Plotwist/tv/:id/:sid",
                element: <SeasDet />
            },
            {
                path: "/Plotwist/tv/:id/:sid/:eid",
                element: <SingleE />
            },
            {
                path: "/Plotwist/person/:pid",
                element: <People />
            },
            {
                path: "/Plotwist/*",
                element: <NotFound />
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);