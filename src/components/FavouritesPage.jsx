function FavouritesPage({ favourites, onSelectMovie, toggleFavourite, goBack }) {
  return (
    <div className="bg-gray-800 p-6 min-h-screen text-white">
      {/* Back button */}
      <button
        onClick={goBack}
        className="text-blue-400 mb-4 hover:text-blue-300"
      >
        ⬅ Back to Home
      </button>

      <h1 className="text-2xl font-bold text-yellow-400 mb-4">
        ⭐ Your Favourite Movies
      </h1>

      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favourites.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-slate-700 p-4 rounded shadow"
            >
              <img
                src={
                  movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
                }
                alt={movie.Title}
                className="w-full rounded cursor-pointer"
                onClick={() => onSelectMovie(movie.imdbID)}
              />
              <h2 className="mt-2 font-bold">{movie.Title}</h2>
              <button
                className="text-red-400 mt-2 cursor-pointer hover:text-red-500"
                onClick={() => toggleFavourite(movie)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavouritesPage;
