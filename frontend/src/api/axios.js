import axios from 'axios';

// Buat instance Axios dengan konfigurasi default
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL || 'https://luxenews.novatix.site'}/api`, // Sesuaikan dengan URL backend Laravel Anda
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },

  // withCredentials: true, // Uncomment ini jika perlu mengirim kredensial (cookies, dll.)
});

export default apiClient; 
