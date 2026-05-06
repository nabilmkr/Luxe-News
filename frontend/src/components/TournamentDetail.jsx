import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';
import Section from './Section';

const TournamentDetail = () => {
  const { slug } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentDetail = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/tournaments/${slug}`);
        console.log('Tournament detail response:', response.data);
        
        if (response.data.status === 'success') {
          setTournament(response.data.data);
        } else {
          throw new Error('Gagal memuat data turnamen');
        }
      } catch (err) {
        console.error('Error fetching tournament detail:', err);
        setError('Gagal memuat turnamen. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTournamentDetail();
    }
  }, [slug]);

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

  if (error || !tournament) {
    return (
      <Section>
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
            <h1 className="text-2xl text-red-500 text-center">
              {error || 'Turnamen tidak ditemukan'}
            </h1>
          </div>
        </div>
      </Section>
    );
  }

  // Format tanggal ke format Indonesia
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };

  // Hitung waktu tersisa hingga pendaftaran ditutup (jika ada)
  const calculateTimeRemaining = () => {
    if (!tournament.registration_end_date) return null;
    
    const now = new Date();
    const endDate = new Date(tournament.registration_end_date);
    const timeRemaining = endDate - now;
    
    if (timeRemaining <= 0) {
      return "Pendaftaran sudah ditutup";
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days} hari ${hours} jam lagi`;
  };

  return (
    <Section>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header dengan poster turnamen */}
          <div className="w-full h-[400px] rounded-t-xl overflow-hidden relative mb-6">
            <img 
              src={tournament.poster ? `http://localhost:8000/storage/${tournament.poster}` : 'https://placehold.co/1200x400?text=No+Image'} 
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${tournament.type === 'national' ? 'bg-blue-600' : 'bg-red-600'}`}>
                  {tournament.type === 'national' ? 'Nasional' : 'Internasional'}
                </span>
                {tournament.game && (
                  <span className="inline-block px-3 py-1 bg-gray-700 rounded text-sm font-semibold">
                    {tournament.game.name}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-white">{tournament.name}</h1>
            </div>
          </div>
          
          {/* Informasi Utama */}
          <div className="bg-gray-800 rounded-xl p-8 mb-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Kolom kiri - Informasi waktu dan lokasi */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Detail Turnamen</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-400 mb-1">Waktu Pelaksanaan</h3>
                    <p className="font-semibold">{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</p>
                  </div>
                  
                  {tournament.registration_start_date && tournament.registration_end_date && (
                    <div>
                      <h3 className="text-gray-400 mb-1">Masa Pendaftaran</h3>
                      <p className="font-semibold">
                        {formatDate(tournament.registration_start_date)} - {formatDate(tournament.registration_end_date)}
                      </p>
                      <p className="text-sm text-amber-400 mt-1">
                        {calculateTimeRemaining()}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-gray-400 mb-1">Lokasi</h3>
                    <p className="font-semibold">{tournament.location || 'Tidak disebutkan'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-400 mb-1">Kuota Tim</h3>
                    <p className="font-semibold">{tournament.team_quota || 'Tidak disebutkan'} Tim</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 mb-1">Prize Pool</h3>
                    <p className="font-semibold">{tournament.prize_pool ? `$${Number(tournament.prize_pool).toLocaleString('en-US')}` : 'Tidak disebutkan'}</p>
                  </div>
                </div>
              </div>
              
              {/* Kolom kanan - Informasi penyelenggara dan kontak */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Informasi Penyelenggara</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-400 mb-1">Diselenggarakan oleh</h3>
                    <p className="font-semibold">{tournament.organizer || 'Tidak disebutkan'}</p>
                  </div>
                  
                  {tournament.contact && (
                    <div>
                      <h3 className="text-gray-400 mb-1">Kontak</h3>
                      <p className="font-semibold">{tournament.contact}</p>
                    </div>
                  )}
                  
                  {tournament.website && (
                    <div>
                      <h3 className="text-gray-400 mb-1">Website</h3>
                      <a 
                        href={tournament.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-semibold"
                      >
                        {tournament.website}
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Tombol Daftar/Tertarik */}
                <div className="mt-8">
                  {tournament.contact_wa ? (
                    <a
                      href={`https://wa.me/${tournament.contact_wa.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-lg font-bold text-center bg-green-600 hover:bg-green-700 text-white"
                    >
                      Hubungi WhatsApp
                    </a>
                  ) : (
                    <button
                      className="inline-block px-6 py-3 rounded-lg font-bold text-center bg-gray-600 cursor-not-allowed text-gray-300"
                      disabled
                    >
                      WhatsApp Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Deskripsi Turnamen */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: tournament.description }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TournamentDetail; 