import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useState } from 'react'

import React from 'react'

function MovieDisplay({movies, onSelectMovie, favourites, toggleFavourite, goToFavourites }) {

  const [showFavs, setShowFavs] = useState(false);

  return (
    <>
    <div className="bg-gray-800 p-4">
        <div className="flex justify-between items-center p-4 text-white">
            <h1 className="text-2xl text-blue-700 font-bold">Movies</h1>
            <h2 className="text-2xl text-gray-200 cursor-pointer" onClick={goToFavourites}>
              ⭐ Favourite Movies
            </h2>
            {/* <select name="genre" id="genre" className="mt-2 p-2 rounded ">
                <option value="" className='text-black'>All</option>
                <option value="action" className='text-black'>Action</option>
                <option value="comedy" className='text-black'>Comedy</option>
                <option value="drama" className='text-black'>Drama</option>
            </select> */}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {movies.map((movie) => {
          const isFav = favourites.some((fav) => fav.imdbID === movie.imdbID);
          return (
            <div key={movie.imdbID} className='bg-slate-700 p-4 rounded text-white shadow'>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt="Movie Poster" className="w-full h-auto rounded cursor-pointer" onClick={() => onSelectMovie(movie.imdbID)}/>
                <h2 className="text-xl font-bold mt-2">{movie.Title}</h2>
                <p className="mt-1">{movie.Year}</p>
                <div className='flex justify-between items-center'>
                  <button className="bg-blue-500 text-white p-2 rounded mt-2 cursor-pointer">Watch Now</button>
                  <button aria-label="Toggle favourite" className="justify-center text-yellow-500 p-2 rounded cursor-pointer" onClick={() => toggleFavourite(movie)}>
                    {isFav ? (
                      <StarSolid className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <StarIcon className="h-6 w-6 text-yellow-500" />
                    )}
                  </button>
                </div>
            </div>
            );
            })}
        </div>
    </div>
    </>
  );
}

export default MovieDisplay
