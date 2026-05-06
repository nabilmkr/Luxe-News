import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';
import Section from './Section';

const NewsDetail = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState({ name: '', content: '' });
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/news/${slug}`);
        console.log('News detail response:', response.data);
        
        if (response.data.status === 'success') {
          setNews(response.data.data);
          setComments(response.data.data.comments || []);
        } else {
          throw new Error('Gagal memuat data berita');
        }
      } catch (err) {
        console.error('Error fetching news detail:', err);
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug]);

  const handleCommentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.name.trim() || !comment.content.trim()) {
      setCommentError('Nama dan komentar harus diisi');
      return;
    }

    try {
      setSubmitting(true);
      setCommentError(null);
      
      const response = await apiClient.post(`/news/${news.id}/comments`, comment);
      
      if (response.data.status === 'success') {
        // Tambahkan komentar baru ke daftar komentar
        setComments([response.data.data, ...comments]);
        // Reset form
        setComment({ name: '', content: '' });
      } else {
        throw new Error('Gagal mengirim komentar');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      setCommentError('Gagal mengirim komentar. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Section>
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </Section>
    );
  }

  if (error || !news) {
    return (
      <Section>
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
            <h1 className="text-2xl text-red-500 text-center">
              {error || 'Berita tidak ditemukan'}
            </h1>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
          {/* Gambar berita */}
          <div className="w-full h-96 relative">
            <img 
              src={news.image ? `http://localhost:8000/storage/${news.image}` : 'https://placehold.co/800x400?text=No+Image'} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex items-center text-sm text-white/80 mb-2">
                <span className="bg-indigo-600 px-2 py-1 rounded mr-3">
                  {news.category?.name || 'Umum'}
                </span>
                <span>{new Date(news.published_at).toLocaleDateString('id-ID')}</span>
                {news.game && (
                  <span className="ml-3 px-2 py-1 bg-gray-700 rounded">{news.game.name}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Konten berita */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-4">{news.title}</h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
            
            {/* Bagian komentar */}
            <div className="mt-12 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Komentar ({comments.length})</h2>
              
              {/* Form komentar */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-white mb-2">Nama</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={comment.name}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nama Anda"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="block text-white mb-2">Komentar</label>
                  <textarea
                    id="content"
                    name="content"
                    value={comment.content}
                    onChange={handleCommentChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tulis komentar Anda di sini"
                  ></textarea>
                </div>
                
                {commentError && (
                  <div className="mb-4 text-red-500">{commentError}</div>
                )}
                
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Mengirim...' : 'Kirim Komentar'}
                </button>
              </form>
              
              {/* Daftar komentar */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <span className="text-sm text-gray-400">
                          {new Date(item.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NewsDetail; 