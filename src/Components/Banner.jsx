import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

const Banner = () => {
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        fetch('/SliderData.json')
            .then(res => res.json())
            .then(data => setSliderData(data));
    }, []);

    return (
        <div className="relative rounded-xl overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="rounded-xl"
            >
                {sliderData.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative">
                            <img src={slide.image} className="w-full h-[400px] object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black opacity-60 flex flex-col justify-center items-center md:items-start text-white p-12 md:p-24">
                                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
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
