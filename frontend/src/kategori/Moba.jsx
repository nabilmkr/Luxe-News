import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // icon search simple dari react-icons
import Section from "../components/Section";
import Button from "../components/design/Button";
import StarIcon from "../components/design/Staricon";
import Carouselmoba from "../components/design/Carouselmoba";
import { getCategoryNews } from "../api/categoryService";

const Moba = () => {
  const location = useLocation();
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchRef = useRef(null);

  // Fetch news data
  useEffect(() => {
    console.log("VITE_BACKEND_URL inside Moba.jsx:", import.meta.env.VITE_BACKEND_URL); // DEBUG LINE
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getCategoryNews('MOBA', searchTerm);
        if (response.status === 'success') {
          console.log('API Response:', response.data); // Debug
          setNews(response.data);
        }
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchTerm]);

  // Check if a game was selected from the Games component
  useEffect(() => {
    if (location.state?.selectedGame) {
      const gameCategory = news.find(
        item => item.game && item.game.toLowerCase() === location.state.selectedGame.toLowerCase()
      )?.game || "all";
      
      setSelectedCategory(gameCategory);
    }
  }, [location.state, news]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(4);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(4);
  };

  // Close search input kalau klik di luar search input dan icon
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest("#search-toggle")
      ) {
        setSearchActive(false);
        setSearchTerm("");
      }
    };
    if (searchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchActive]);

  // Get unique game categories for filter buttons - mengambil game name, bukan category
  const uniqueCategories = ["all", ...Array.from(new Set(news.filter(item => item.game).map(item => item.game)))];

  // Filter news based on game and search term
  const filteredNews = news.filter((item) =>
    selectedCategory === "all" ? true : item.game === selectedCategory
  );

  const getImageUrl = (item) => {
    if (item.image && item.image.startsWith('http')) {
      return item.image;
    } else if (item.thumbnail) {
      return `${import.meta.env.VITE_BACKEND_URL}/storage/${item.thumbnail}`;
    } else if (item.image) {
      return `${import.meta.env.VITE_BACKEND_URL}/storage/${item.image}`;
    } else {
      return 'https://placehold.co/800x400?text=No+Image';
    }
  };

  return (
    <Section id="Moba">
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <h1 className="h1 mb-6">Moba Games</h1>
        <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
          Masuki dunia pertempuran strategi real-time! Di kategori MOBA, kami hadirkan update terbaru dari game-game populer seperti Mobile Legends, Dota 2, dan League of Legends.
        </p>
      </div>

      <Carouselmoba />

      {/* Bar search + filter */}
      <div className="max-w-4xl mx-auto mt-8 mb-10 flex items-center justify-center gap-4 flex-wrap">

        {/* Search toggle icon */}
        <button
          id="search-toggle"
          onClick={() => setSearchActive((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle search input"
        >
          <FiSearch className="w-6 h-6 text-gray-700" />
        </button>

        {/* Search input dengan animasi smooth */}
        <div
          ref={searchRef}
          className={`overflow-hidden transition-[max-width,opacity,margin] duration-500 ease-in-out ${
            searchActive
              ? "max-w-[280px] opacity-100 ml-2"
              : "max-w-0 opacity-0 ml-0"
          }`}
        >
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            autoFocus={searchActive}
          />
        </div>

        {/* Filter button group */}
        <div className="flex gap-4 flex-wrap">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-2 rounded-full font-semibold transition whitespace-nowrap
                ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
                }`}
            >
              {category === "all" ? "All " : category}
            </button>
          ))}
        </div>
      </div>

      <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No news found.</div>
        ) : (
          <>
            {filteredNews.slice(0, visibleCount).map((item, index) => (
              <div
                key={item.id}
                className={`max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2 ${
                  index > 0 ? "mt-20" : ""
                }`}
              >
                <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
                  <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">
                    {item.title}
                  </h1>
                </div>
                <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                  <img
                    src={getImageUrl(item)}
                    className="w-full h-72 object-cover rounded-lg sm:h-72 sm:col-span-2 lg:col-span-full"
                    alt={item.title}
                    onError={(e) => {
                      console.error('Error loading image:', e.target.src);
                      e.target.src = 'https://placehold.co/800x400?text=No+Image';
                    }}
                  />
                </div>

                <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                  <dd className="flex items-center">
                    <StarIcon />
                    <span>
                      {item.rating}{" "}
                      <span className="text-white font-normal">{item.review}</span>
                    </span>
                  </dd>
                </dl>

                <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
                  {typeof item.content === 'string' && item.content.includes('<') 
                    ? item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                    : item.content?.substring(0, 150) + '...'}
                </p>

                <div className="col-start-1 lg:row-start-5 mt-4">
                  <Link to={`/berita/${item.slug}`}>
                    <Button>Baca Selengkapnya</Button>
                  </Link>
                </div>
              </div>
            ))}

            {visibleCount < filteredNews.length && (
              <div className="text-center mt-12">
                <Button onClick={handleLoadMore}>Load More</Button>
              </div>
            )}
          </>
        )}
      </main>
    </Section>
  );
};

export default Moba;
