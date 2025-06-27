import { FaShieldAlt, FaCheckCircle, FaFilter } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: "Secure & Verified",
      desc: "All users and listings are verified to ensure your safety and peace of mind.",
    },
    {
      id: 2,
      icon: <FaCheckCircle />,
      title: "Easy to Use",
      desc: "Post, browse, and connect with roommates in just a few clicks.",
    },
    {
      id: 3,
      icon: <FaFilter />,
      title: "Smart Filters",
      desc: "Find your ideal roommate using lifestyle and location filters.",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 ">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-gray-900 border border-gray-200 p-8 rounded-xl shadow hover:shadow-md text-center transition duration-300"
          >
            <div className="text-5xl text-indigo-600 mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
