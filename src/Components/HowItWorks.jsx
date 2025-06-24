import { MdAddHome, MdPersonSearch } from "react-icons/md";
import { RiAccountBox2Fill } from "react-icons/ri";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <RiAccountBox2Fill />,
      title: "Create an Account",
      desc: "Sign up with your email or Google to get started.",
    },
    {
      id: 2,
      icon: <MdAddHome />,
      title: "Add Your Listing",
      desc: "Post details about your room or flat easily.",
    },
    {
      id: 3,
      icon: <MdPersonSearch />,
      title: "Find a Roommate",
      desc: "Browse and connect with potential roommates.",
    },
  ];

  return (
    <section className="bg-gray-300 py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white border border-gray-600 flex flex-col justify-center items-center gap-5 shadow-2xl  p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
            <span className="text-6xl text-indigo-600">{step.icon}</span>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
