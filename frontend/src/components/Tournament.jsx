import React, { useState, useEffect } from "react";
import Section from "./Section";
import Button from "../components/design/Button";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

export default function TournamentPortal() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = ["Semua", "Pendaftaran Dibuka", "Kompetisi Berlangsung", "Kompetisi Selesai"];

  useEffect(() => {
    // Fetch tournaments data from API
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/tournaments');
        console.log('Tournament API response:', response.data);
        if (response.data.status === 'success') {
          setTournaments(response.data.data.data || response.data.data);
        } else {
          throw new Error('Failed to fetch tournaments data');
        }
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setError('Failed to load tournaments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  // Fungsi untuk menentukan status turnamen berdasarkan tanggal
  function getTournamentStatus(tournament) {
    const today = new Date();
    const start = new Date(tournament.start_date);
    const end = new Date(tournament.end_date);

    if (today < start) {
      return "Pendaftaran Dibuka";
    } else if (today >= start && today <= end) {
      return "Kompetisi Berlangsung";
    } else if (today > end) {
      return "Kompetisi Selesai";
    }
    return "Unknown";
  }

  // Filter tournaments based on search and status
  const filteredTournaments = tournaments.filter((tournament) => {
    if (!tournament) return false;
    const tournamentStatus = getTournamentStatus(tournament);
    const matchesStatus = selectedStatus === "Semua" || tournamentStatus === selectedStatus;
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDetailClick = (slug) => {
    navigate(`/tournaments/${slug}`);
  };

  return (
    <Section id="tournament">
      <div className="p-6 max-w-7xl mx-auto min-h-screen text-white ">
        <header className="mb-10 text-center">
          <h1 className="h1 mb-6">
          Tournament Esport
          </h1>
          <p className="body-1 max-w-3xl mx-auto text-n-2 ">
          Siapkan tim terbaikmu, hadapi lawan tangguh dari seluruh penjuru negeri, dan raih gelar juara!
          </p>
        </header>

        <div className="flex gap-4 justify-center mb-8 pt-11">
          <input
            type="text"
            placeholder="Cari turnamen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full max-w-xs"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="relative group overflow-hidden rounded-2xl bg-transparent border border-white/60 p-4 shadow-lg transition-transform hover:scale-105 flex flex-col"
                  style={{ minHeight: '420px' }}
                >
                  <img
                    src={tournament.poster ? `http://localhost:8000/storage/${tournament.poster}` : 'https://placehold.co/600x400?text=No+Image'}
                    alt={tournament.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${tournament.type === 'national' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                      {tournament.type === 'national' ? 'National' : 'International'}
                    </span>
                    {tournament.game && (
                      <span className="inline-block px-2 py-1 bg-gray-700 rounded text-xs font-semibold text-white">
                        {tournament.game.name}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1 line-clamp-2 min-h-[48px]">{tournament.name}</h2>
                  <p className="text-sm text-gray-300 mb-1">
                    {new Date(tournament.start_date).toLocaleDateString()} - {new Date(tournament.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">{tournament.location}</p>
                  <p className="text-sm text-yellow-400 font-bold mb-2">{tournament.prize_pool ? `$${Number(tournament.prize_pool).toLocaleString('en-US')}` : 'Prize pool tidak disebutkan'}</p>
                  <div className="flex-grow" />
                  <Button onClick={() => handleDetailClick(tournament.slug)}>
                    Selengkapnya
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 mt-10 text-gray-500">Tidak ada turnamen yang sesuai.</p>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
