import React from "react";

function MovieModal({ movie, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 p-4 flex justify-center items-center z-50">
  <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full relative grid md:grid-cols-2 gap-6">
    <button onClick={onClose} aria-label="Close modal"
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
          ✖
        </button>
    {/* Movie Poster */}
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
      alt={movie.Title}
      className="w-full h-auto rounded-xl object-cover"
    />

    {/* Movie Details */}
    <div>
      <h2 className="text-3xl font-bold mb-3">{movie.Title}</h2>
      <p className="text-gray-600 mb-4">{movie.Plot}</p>
      
      <ul className="space-y-2 text-sm">
        <li>🎬 <span className="font-semibold">Genre:</span> {movie.Genre}</li>
        <li>🌍 <span className="font-semibold">Language:</span> {movie.Language}</li>
        <li>⭐ <span className="font-semibold">IMDb:</span> {movie.imdbRating}</li>
      </ul>
    </div>
  </div>
</div>

  );
}

export default MovieModal;
