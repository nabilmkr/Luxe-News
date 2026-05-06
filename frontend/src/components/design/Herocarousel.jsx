import React, { useState, useEffect } from "react";

// Carousel component
const Herocarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/43540f45-280c-4c78-af85-38632715b2c7/dglfvho-bfb2de92-ede0-41ab-ab92-3d15a1c46bf8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzNTQwZjQ1LTI4MGMtNGM3OC1hZjg1LTM4NjMyNzE1YjJjN1wvZGdsZnZoby1iZmIyZGU5Mi1lZGUwLTQxYWItYWI5Mi0zZDE1YTFjNDZiZjgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OyzPGQvIJ125YEffrAKSgPwzMQx20OeDYjy0xdSnEoI",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/839ad802-cfe4-4f36-9be7-6a6d5d6c7302/dfijvzg-6178840e-84bc-4215-9252-0f80f1031753.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgzOWFkODAyLWNmZTQtNGYzNi05YmU3LTZhNmQ1ZDZjNzMwMlwvZGZpanZ6Zy02MTc4ODQwZS04NGJjLTQyMTUtOTI1Mi0wZjgwZjEwMzE3NTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.53h2E_MzwzhKxxWAZAMtz7ZRgb_q4qfRjdTJmO2Q_4k",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dafa553e-a735-4c36-81d9-125e54aa2943/djfw6jf-c8e79d37-154d-410d-bda3-1dd7aa307497.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhZmE1NTNlLWE3MzUtNGMzNi04MWQ5LTEyNWU1NGFhMjk0M1wvZGpmdzZqZi1jOGU3OWQzNy0xNTRkLTQxMGQtYmRhMy0xZGQ3YWEzMDc0OTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._UM_fMJmznJbt8IYOwLWpzq06EKjXNRl8qW7sGVvA10",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d3170e6-6b28-4d11-80f1-244bfb1dfaae/djck18v-cd9a3af1-1cdc-46bd-a13e-cfda274d969b.jpg/v1/fill/w_1192,h_670,q_70,strp/tekken_8___heihachi_mishima_t8_logo_wallpaper_by_cr1one_djck18v-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvOGQzMTcwZTYtNmIyOC00ZDExLTgwZjEtMjQ0YmZiMWRmYWFlXC9kamNrMTh2LWNkOWEzYWYxLTFjZGMtNDZiZC1hMTNlLWNmZGEyNzRkOTY5Yi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.tk5WQh5l4-zJFDhPykf3Huu0TFG-XAJIKIGJC8P-OLg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
  
      <div
        className="carousel w-full overflow-hidden rounded-lg mb-6 relative"
        style={{
          height: "500px", 
        }}
      >
        <div
          className="carousel-items flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="carousel-item w-full"
              style={{ flexShrink: 0 }}
            >
              {/* Tetapkan dimensi gambar secara eksplisit */}
              <img
                src={img}
                alt={`Akademik ${index}`}
                className="w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%", // Sesuaikan dengan tinggi container
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      

    
      </div>
    </div>
  );
};

export default Herocarousel;