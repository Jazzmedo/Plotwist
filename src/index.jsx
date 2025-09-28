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
    path: "/Plotwist",
    element: <App />,
    children: [
      { index: true, element: <Home /> },            // /Plotwist
      { path: "Movies", element: <MovieSec type="movie" /> },  // /Plotwist/Movies
      { path: "TV", element: <MovieSec type="tv" /> },         // /Plotwist/TV
      { path: ":type/:id", element: <Movie /> },               // /Plotwist/movie/1035259
      { path: "tv/:id/:sid", element: <SeasDet /> },           // /Plotwist/tv/123/2
      { path: "tv/:id/:sid/:eid", element: <SingleE /> },      // /Plotwist/tv/123/2/5
      { path: "person/:pid", element: <People /> },            // /Plotwist/person/456
      { path: "*", element: <NotFound /> }                     // Catch-all 404
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
