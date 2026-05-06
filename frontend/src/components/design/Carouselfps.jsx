import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getCategoryBanners } from "../../api/categoryService";

const Carouselfps = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await getCategoryBanners('FPS');
        if (response.status === 'success') {
          setBanners(response.data);
        }
      } catch (err) {
        setError('Failed to load banners');
        console.error('Error fetching banners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

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
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/${banner.image}`}
                alt={banner.title}
                className="w-full h-[400px] object-cover"
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

export default Carouselfps;
