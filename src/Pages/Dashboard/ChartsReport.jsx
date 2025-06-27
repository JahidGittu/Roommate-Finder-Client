// DashboardAnalyticsChart.jsx
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ── CONSTANTS ─────────────────────────────────────────────────
const TIME_FILTERS = [
  { label: "7 Days", value: 7 },
  { label: "15 Days", value: 15 },
  { label: "1 Month", value: 30 },
];
const LISTING_API = "https://roommate-finder-server-ten.vercel.app/requests/all";
const BOOKING_API = "https://roommate-finder-server-ten.vercel.app/bookings";

// ── HELPERS ─────────────────────────────────────────────────────
const dateDiffDays = (d1, d2) => (d1 - d2) / (1000 * 60 * 60 * 24);

// Parse date from a field or fallback to ObjectId timestamp
const parseDate = (item, field) => {
  const raw = item[field];
  if (raw) {
    const d = new Date(raw);
    if (!isNaN(d)) return d;
  }
  try {
    const ts = parseInt(item._id.substring(0, 8), 16) * 1000;
    return new Date(ts);
  } catch {
    return new Date();
  }
};

// Group items by day label and sort chronologically
const groupAndSort = (items, dateField) => {
  const grouped = {};
  items.forEach((item) => {
    const d = parseDate(item, dateField);
    const key = d.toLocaleDateString("default", { month: "short", day: "numeric" });
    grouped[key] = (grouped[key] || 0) + 1;
  });
  return Object.entries(grouped)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => new Date(a.name) - new Date(b.name));
};

// ── MAIN COMPONENT ──────────────────────────────────────────────
const DashboardAnalyticsChart = () => {
  const [listingRange, setListingRange] = useState(7);
  const [bookingRange, setBookingRange] = useState(7);
  const [rawListings, setRawListings] = useState([]);
  const [rawBookings, setRawBookings] = useState([]);

  // Fetch raw data once
  useEffect(() => {
    fetch(LISTING_API)
      .then((r) => r.json())
      .then(setRawListings)
      .catch((e) => console.error("Listing fetch error", e));

    fetch(BOOKING_API)
      .then((r) => r.json())
      .then(setRawBookings)
      .catch((e) => console.error("Booking fetch error", e));
  }, []);

  // Memoized listing data
  const listingData = useMemo(() => {
    const now = new Date();
    const filtered = rawListings.filter((i) => dateDiffDays(now, parseDate(i, "createdAt")) <= listingRange);
    return groupAndSort(filtered, "createdAt");
  }, [rawListings, listingRange]);

  // Memoized booking data
  const bookingData = useMemo(() => {
    const now = new Date();
    const filtered = rawBookings.filter((i) => dateDiffDays(now, parseDate(i, "bookingTime")) <= bookingRange);
    return groupAndSort(filtered, "bookingTime");
  }, [rawBookings, bookingRange]);

  // Totals
  const totalListings = listingData.reduce((sum, d) => sum + d.count, 0);
  const totalBookings = bookingData.reduce((sum, d) => sum + d.count, 0);

  // Filter buttons
  const FilterButtons = ({ current, onSelect }) => (
    <div className="flex gap-2">
      {TIME_FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onSelect(f.value)}
          className={`px-3 py-1 rounded text-xs border transition ${
            current === f.value
              ? "bg-violet-600 text-white border-transparent"
              : "bg-base-200 text-gray-700 border-gray-300 hover:bg-base-300"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Listings Panel (AreaChart) ────────────────────────── */}
      <div className="bg-base-100 p-4 rounded-lg shadow-lg border">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold">📦 Listings Overview</h3>
            <p className="text-sm text-gray-500">
              Last {listingRange} days: {totalListings} listings
            </p>
          </div>
          <FilterButtons current={listingRange} onSelect={setListingRange} />
        </div>
        {listingData.length === 0 ? (
          <p className="text-center py-10 text-gray-400">No listing data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={listingData}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <defs>
                <linearGradient id="listingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                fill="url(#listingGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Bookings Panel (ScatterChart) ─────────────────────── */}
      <div className="bg-base-100 p-4 rounded-lg shadow-lg border">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold">📅 Bookings Overview</h3>
            <p className="text-sm text-gray-500">
              Last {bookingRange} days: {totalBookings} bookings
            </p>
          </div>
          <FilterButtons current={bookingRange} onSelect={setBookingRange} />
        </div>
        {bookingData.length === 0 ? (
          <p className="text-center py-10 text-gray-400">No booking data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="category"
                dataKey="name"
                name="Date"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="number"
                dataKey="count"
                name="Count"
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend verticalAlign="top" height={36} />
              <Scatter
                name="Bookings"
                data={bookingData}
                fill="#6366f1"
              />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalyticsChart;
