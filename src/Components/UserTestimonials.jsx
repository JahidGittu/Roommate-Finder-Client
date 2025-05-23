import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UserTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  const chunked = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunked.push(testimonials.slice(i, i + 3));
  }

  const settings = {
    dots: true,
    infinite: chunked.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        💬 ইউজারদের অভিজ্ঞতা
      </h2>

      <Slider {...settings}>
        {chunked.map((group, idx) => (
          <div key={idx}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {group.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-md p-6 rounded-xl border border-gray-200 transition hover:shadow-lg"
                >
                  <p className="text-sm text-gray-700 italic mb-4">
                    “{item.review}”
                  </p>

                  {/* ইউজার ইনফো সহ ছবি */}
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      src={item.photo || "https://via.placeholder.com/100"}
                      alt={item.user_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">{item.user_name}</p>
                      <p className="text-xs">{item.location}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(item.bookingTime).toLocaleDateString("bn-BD", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default UserTestimonials;
