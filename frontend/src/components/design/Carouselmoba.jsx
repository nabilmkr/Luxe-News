import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getCategoryBanners } from "../../api/categoryService";

const Carouselmoba = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await getCategoryBanners('MOBA');
        if (response.status === 'success') {
          console.log('Banner data lengkap:', JSON.stringify(response.data));
          setBanners(response.data);
        } else {
          console.error('Response status bukan success:', response);
          setError('Gagal memuat banner: response status bukan success');
        }
      } catch (err) {
        setError('Gagal memuat banner');
        console.error('Error saat mengambil banner:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const getImageUrl = (banner) => {
    if (!banner || !banner.image) {
      console.error('Banner tidak memiliki properti image:', banner);
      return 'https://placehold.co/800x400?text=No+Image';
    }
    
    // Log untuk debugging
    console.log('Path gambar banner:', banner.image);
    
    // Jika URL absolut
    if (banner.image.startsWith('http')) {
      return banner.image;
    }
    
    // Path untuk gambar yang diupload oleh Filament (ke disk 'media')
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    
    // 1. Jika image sudah berisi path lengkap
    if (banner.image.includes('/')) {
      // Format yang sudah termasuk path (biasanya dari API yang sudah dimodifikasi)
      const fullPath = banner.image.startsWith('/') ? banner.image : `/${banner.image}`;
      const directUrl = `${baseUrl}${fullPath}`;
      console.log('URL dengan path lengkap:', directUrl);
      return directUrl;
    }
    
    // 2. Format standar untuk disk 'media' Filament
    // Filament menyimpan gambar di public/media/category-banners
    const mediaUrl = `${baseUrl}/media/category-banners/${banner.image}`;
    console.log('URL dengan format standar media:', mediaUrl);
    return mediaUrl;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return null; // Hide carousel if there's an error
  }

  if (banners.length === 0) {
    return null; // Hide carousel if no banners
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg overflow-hidden max-w-[62rem] mx-auto mb-8"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative">
              <img
                src={getImageUrl(banner)}
                alt={banner.title}
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  console.error('Error loading banner image:', e.target.src);
                  // Gunakan placeholder dari placehold.co dengan judul banner
                  const title = encodeURIComponent(banner.title.substring(0, 25));
                  e.target.src = `https://placehold.co/800x400?text=${title}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent">
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-2xl font-bold">{banner.title}</h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carouselmoba;
