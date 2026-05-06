import React, { useState, useEffect } from "react";
import { Slide, Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import Section from "./Section";
import { BackgroundCircles } from "./design/Hero";
import apiClient from "../api/axios";

const Games = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map category names to their route paths
  const categoryRouteMap = {
    "MOBA": "moba",
    "FPS": "fps",
    "RPG": "rpg"
  };

  useEffect(() => {
    // Fetch games and categories data from API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        console.log('Mulai fetch games dari API...');
        // Fetch all games
        const gamesResponse = await apiClient.get('/games');
        console.log('Games API response:', gamesResponse);
        
        console.log('Mulai fetch categories dari API...');
        // Fetch all categories
        const categoriesResponse = await apiClient.get('/categories');
        console.log('Categories API response:', categoriesResponse);
        
        if (gamesResponse.data.status === 'success' && categoriesResponse.data.status === 'success') {
          console.log('Data games:', gamesResponse.data.data);
          console.log('Data categories:', categoriesResponse.data.data);
          setGames(gamesResponse.data.data);
          setCategories(categoriesResponse.data.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        console.error('Error detail:', err.message);
        console.error('Error stack:', err.stack);
        
        if (err.response) {
          // Respons server diterima tapi bukan 2xx
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
          console.error('Error response headers:', err.response.headers);
        } else if (err.request) {
          // Request dibuat tapi tidak ada respons
          console.error('Error request:', err.request);
        } else {
          // Error saat setup request
          console.error('Error message:', err.message);
        }
        
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openPopup = (game) => {
    setCurrentGame(game);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentGame(null);
  };

  // Direct navigation to category page with game filter when View is clicked
  const navigateToGameCategory = (game) => {
    // Get the category name and convert to lowercase route
    const categoryRoute = categoryRouteMap[game.category?.name] || "games";
    
    // Pass the game name as state to be used for filtering
    navigate(`/${categoryRoute}`, { 
      state: { 
        selectedGame: game.name 
      }
    });
  };

  // Get unique genre list from categories
  const genres = ["ALL", ...categories.map(category => category.name)];

  // Filter games based on selected genre
  const filteredGames = selectedGenre === "ALL" 
    ? games 
    : games.filter(game => game.category?.name === selectedGenre);

  return (
    <Section id="games">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="relative z-10 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">Gaming news category</h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Jelajahi berbagai macam berita game terpopuler dan terupdate berdasarkan kategori
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10 relative z-20 overflow-x-auto py-2">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-6 py-2 rounded-full border transition-colors ${
                selectedGenre === genre
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "bg-n-6 border-n-1 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white"
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        

        {/* Loading and Error States */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="text-white shadow-lg rounded-lg overflow-hidden relative group max-w-[350px] w-full"
                >
                  <img
                    src={game.logo ? `http://localhost:8000/storage/${game.logo}` : 'https://placehold.co/600x400?text=No+Image'}
                    alt={`Image of ${game.name}`}
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg object-cover transition-all duration-100"
                  />

                  <div className="absolute left-0 top-[-100%] opacity-0 group-hover:opacity-100 group-hover:top-0 p-4 w-full h-full bg-black/60 group-hover:backdrop-blur-sm transition-all duration-300 flex flex-col">
                    <div className="flex flex-col justify-between h-full">
                      <Slide cascade>
                        <div> 
                          <h1 className="text-2xl font-bold">{game.name}</h1>
                          <Fade cascade damping={0.02} className="flex-grow">
                            <p className="text-sm text-gray-300 mt-1">
                              Release Date: {game.release_date ? new Date(game.release_date).toLocaleDateString('id-ID') : 'TBA'}
                            </p>
                            <p className="text-sm text-gray-300">Developer: {game.developer || 'N/A'}</p>
                            <p className="text-md mt-2 flex-grow ">{game.description?.substring(0, 120)}...</p>
                          </Fade>
                        </div>
                        <div className="mt-auto">
                          <button
                            className="border-2 border-indigo-800 px-7 py-2 rounded-xl hover:bg-black/20 duration-100 hover:text-white transform hover:scale-105 w-full"
                            onClick={() => navigateToGameCategory(game)}
                          >
                            View
                          </button>
                        </div>
                      </Slide>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-4 mt-10 text-gray-500">No games found in this category.</p>
            )}
          </div>
        )}

        {isPopupOpen && currentGame && (
          <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
            <div className="p-8 sm:p-10 rounded-lg max-w-lg w-full relative bg-gradient-to-b from-black to-indigo-950 text-white animate-floating">
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-3xl text-white"
                aria-label="Close modal"
              >
                &times;
              </button>
              <img
                src={currentGame.logo ? `http://localhost:8000/storage/${currentGame.logo}` : 'https://placehold.co/600x400?text=No+Image'}
                alt={`Image of ${currentGame.name}`}
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg object-cover mb-6"
              />
              <h2 className="text-2xl font-bold text-white mb-4">{currentGame.name}</h2>
              <p className="text-lg text-white mb-4">{currentGame.description}</p>
              <div className="mt-4 flex justify-start items-center">
                <button
                  onClick={() => {
                    closePopup();
                    navigateToGameCategory(currentGame);
                  }}
                  className="text-white hover:text-indigo-500 font-semibold px-6 py-3 rounded-lg border-2 border-white hover:border-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Baca Berita Terkait
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Games;
