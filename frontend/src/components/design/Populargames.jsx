import React, { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Populargames = () => {
  const [hotNews, setHotNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotNews = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/news/hot');
        if (response.data.status === 'success') {
          setHotNews(response.data.data);
        } else {
          throw new Error('Gagal memuat berita populer');
        }
      } catch (err) {
        console.error('Error fetching hot news:', err);
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotNews();
  }, []);

  const handleNewsClick = (slug) => {
    navigate(`/news/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (hotNews.length === 0) {
    return <div className="text-center text-n-2 py-8">Belum ada berita populer tersedia.</div>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Berita Populer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotNews.map((newsItem) => (
          <div 
            key={newsItem.id}
            className="bg-n-7 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col"
            onClick={() => handleNewsClick(newsItem.slug)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={newsItem.thumbnail ? `http://localhost:8000/storage/${newsItem.thumbnail}` : 'https://placehold.co/600x400?text=Berita'}
                alt={newsItem.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center mb-3">
                <span className="bg-indigo-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                  {newsItem.category?.name || 'Umum'}
                </span>
                <span className="text-n-3 text-xs ml-2">
                  {new Date(newsItem.published_at).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">{newsItem.title}</h3>
              
              <p className="text-n-3 mb-4 line-clamp-3">
                {newsItem.excerpt || (newsItem.content ? newsItem.content.replace(/<[^>]*>/g, '').substring(0, 120) : '')}...
              </p>
              
              <div className="mt-auto">
                <button className="text-indigo-400 hover:text-indigo-300 inline-flex items-center">
                  Baca selengkapnya
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Populargames;
