import { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const [sliderData, setSliderData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Fetch slider data after component mounts
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const res = await fetch('/SliderData.json');
        const data = await res.json();
        setSliderData(data);
      } catch (err) {
        console.error('Failed to fetch slider data:', err);
      }
    };

    fetchSliderData();
  }, []);

  // Run autoplay and advance once when Swiper instance is ready
  useEffect(() => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start();
      const timer = setTimeout(() => swiperInstance.slideNext(), 1000);
      return () => clearTimeout(timer);
    }
  }, [swiperInstance]);

  const handleSwiperInit = useCallback((swiper) => {
    setSwiperInstance(swiper);
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  if (sliderData.length === 0) return null;

  return (
    <div className="relative rounded-xl overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChange}
        className="rounded-xl"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img
                src={slide.image}
                className="w-full h-[400px] object-cover rounded-xl"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-black opacity-60 flex flex-col justify-center items-center md:items-start text-white p-12 md:p-24">
                <h2 className="text-3xl font-bold mb-2">
                  {activeIndex === index ? (
                    <Typewriter
                      key={`${slide.id}-${activeIndex}`}
                      words={[slide.title]}
                      cursor
                      typeSpeed={50}
                      deleteSpeed={20}
                      delaySpeed={1000}
                      loop={1}
                    />
                  ) : (
                    slide.title
                  )}
                </h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
