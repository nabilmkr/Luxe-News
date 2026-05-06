import apiClient from './axios';

export const getCategoryNews = async (category = '', search = '') => {
    try {
        const params = new URLSearchParams();
        if (category && category !== 'all') params.append('category', category);
        if (search) params.append('search', search);
        
        console.log(`Fetching category news with params: ${params.toString()}`);
        const response = await apiClient.get(`/category-news?${params.toString()}`);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching category news:', error);
        throw error;
    }
};

export const getCategoryBanners = async (category = '') => {
    try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        
        console.log(`Mengambil banner kategori dengan params: ${params.toString()}`);
        const response = await apiClient.get(`/category-banners?${params.toString()}`, {
            timeout: 10000 // 10 detik timeout
        });
        console.log('Response API Banner:', response.data);
        
        // Pastikan API mengembalikan data dalam format yang benar
        if (!response.data || !response.data.status || response.data.status !== 'success') {
            console.error('Format response API tidak sesuai:', response.data);
            throw new Error('Format response API tidak sesuai');
        }
        
        if (!response.data.data || !Array.isArray(response.data.data)) {
            console.error('Data banner tidak ditemukan atau bukan array:', response.data);
            response.data.data = []; // Set data kosong jika tidak ada
        }
        
        // Log URL gambar untuk debugging
        response.data.data.forEach((banner, index) => {
            console.log(`Banner ${index} image path:`, banner.image);
        });
        
        return response.data;
    } catch (error) {
        console.error('Error saat mengambil banner kategori:', error);
        throw error;
    }
};

export const getCategoryNewsDetail = async (slug) => {
    try {
        const response = await apiClient.get(`/category-news/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news detail:', error);
        throw error;
    }
}; 