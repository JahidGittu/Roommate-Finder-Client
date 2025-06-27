import { useEffect, useState } from "react";

const StatCards = () => {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalBooked: 0,
    uniqueUsers: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [reqRes, bookingsRes] = await Promise.all([
          fetch("https://roommate-finder-server-ten.vercel.app/requests/all"),
          fetch("https://roommate-finder-server-ten.vercel.app/bookings"),
        ]);

        const requests = await reqRes.json();
        const bookings = await bookingsRes.json();

        const totalListings = requests.length;
        const totalBooked = bookings.length;
        const totalReviews = bookings.filter((b) => b.review?.trim()).length;
        const uniqueUsers = new Set(requests.map((r) => r.user_email)).size;

        setStats({
          totalListings,
          totalBooked,
          uniqueUsers,
          totalReviews,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    loadStats();
  }, []);

  const cardStyle =
    "bg-white shadow-md border border-gray-100 p-6 rounded-xl text-center";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className={cardStyle}>
        <h4 className="text-sm text-gray-500 mb-1">Total Listings</h4>
        <p className="text-3xl font-bold text-blue-600">{stats.totalListings}</p>
      </div>
      <div className={cardStyle}>
        <h4 className="text-sm text-gray-500 mb-1">Total Booked</h4>
        <p className="text-3xl font-bold text-green-600">{stats.totalBooked}</p>
      </div>
      <div className={cardStyle}>
        <h4 className="text-sm text-gray-500 mb-1">Unique Users</h4>
        <p className="text-3xl font-bold text-purple-600">{stats.uniqueUsers}</p>
      </div>
      <div className={cardStyle}>
        <h4 className="text-sm text-gray-500 mb-1">Total Reviews</h4>
        <p className="text-3xl font-bold text-yellow-600">{stats.totalReviews}</p>
      </div>
    </div>
  );
};

export default StatCards;
