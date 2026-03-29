import { HelicopterIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const cars = [
  {
    id: 1,
    name: "BMW M4 Competition",
    sub: "2024 · 3.0L Twin-Turbo",
    price: 84900,
    oldPrice: 92000,
    badge: "NEW",
    badgeColor: "bg-yellow-400 text-black",
    type: "sports",
    hp: "503",
    mpg: "25",
    seats: "4",
    year: 2024,
    rating: 4.9,
    reviews: 128,
    bgFrom: "BMW.jpg",

  },
  {
    id: 2,
    name: "Mercedes GLE 63 AMG",
    sub: "2024 · 4.0L V8 Biturbo",
    price: 119500,
    oldPrice: null,
    badge: "HOT",
    badgeColor: "bg-red-600 text-white",
    type: "suv",
    hp: "603",
    mpg: "21",
    seats: "5",
    year: 2024,
    rating: 4.8,
    reviews: 94,
    bgFrom: "/g63.jpg",
  },
  {
    id: 3,
    name: "Porsche Taycan Turbo",
    sub: "2024 · Dual Motor Electric",
    price: 153000,
    oldPrice: 160000,
    badge: "SALE",
    badgeColor: "bg-emerald-600 text-white",
    type: "electric",
    hp: "670",
    mpg: "82e",
    seats: "4",
    year: 2024,
    rating: 5.0,
    reviews: 211,
    bgFrom: "Tycan.jpg"
  },
  {
    id: 4,
    name: "Audi RS7 Sportback",
    sub: "2023 · 4.0L TFSI V8",
    price: 127000,
    oldPrice: null,
    badge: null,
    badgeColor: null,
    type: "luxury",
    hp: "591",
    mpg: "23",
    seats: "5",
    year: 2023,
    rating: 4.7,
    reviews: 76,
    bgFrom: "audi.jpg"
  },
  {
    id: 5,
    name: "Tesla Model S Plaid",
    sub: "2024 · Tri-Motor Electric",
    price: 89990,
    oldPrice: 99900,
    badge: "SALE",
    badgeColor: "bg-emerald-600 text-white",
    type: "electric",
    hp: "1020",
    mpg: "96e",
    seats: "5",
    year: 2024,
    rating: 4.9,
    reviews: 318,
    bgFrom:"tesla.jpg"
  },
  {
    id: 6,
    name: "Range Rover Sport",
    sub: "2024 · 3.0L Supercharged",
    price: 98500,
    oldPrice: null,
    badge: "NEW",
    badgeColor: "bg-yellow-400 text-black",
    type: "suv",
    hp: "395",
    mpg: "20",
    seats: "7",
    year: 2024,
    rating: 4.6,
    reviews: 63,
    bgFrom: "Range.jpg"
  },
  {
    id: 7,
    name: "Bentley Continental GT",
    sub: "2023 · 6.0L W12",
    price: 238000,
    oldPrice: null,
    badge: null,
    badgeColor: null,
    type: "luxury",
    hp: "650",
    mpg: "17",
    seats: "4",
    year: 2023,
    rating: 5.0,
    reviews: 41,
    bgFrom: "/bentely.jpg"
  },
  {
    id: 8,
    name: "Chevrolet Corvette Z06",
    sub: "2024 · 5.5L Flat-Plane V8",
    price: 115000,
    oldPrice: 125000,
    badge: "HOT",
    badgeColor: "bg-red-600 text-white",
    type: "sports",
    hp: "670",
    mpg: "19",
    seats: "2",
    year: 2024,
    rating: 4.9,
    reviews: 152,
    bgFrom:"/chevrolet.jpg"
  },
];

const filters = ["All", "SUV", "Sedan", "Sports", "Electric", "Luxury"];

function CarIllustration({ bgFrom, bgTo }) {
  return (
<img src={bgFrom} alt="CAr Image" /> 


);
}

function StarRating({ rating }) {
  return (
    <span className="text-yellow-400 text-xs tracking-wider">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-zinc-700"}>★</span>
      ))}
    </span>
  );
}

function CarCard({ car }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transition-all duration-300 cursor-pointer group"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        borderColor: hovered ? "#d4af37" : undefined,
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <CarIllustration bgFrom={car.bgFrom} bgTo={car.bgTo} />
        {car.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full z-10 tracking-widest ${car.badgeColor}`}>
            {car.badge}
          </span>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-base transition-all duration-200"
          style={{ background: "rgba(10,10,10,0.6)", border: "0.5px solid #333" }}
        >
          <span className={liked ? "text-red-500" : "text-zinc-500"}>{liked ? "♥" : "♡"}</span>
        </button>
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-zinc-900 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="font-semibold text-zinc-100 text-sm tracking-tight">{car.name}</div>
        <div className="text-xs text-zinc-500 mt-0.5 mb-3">{car.sub}</div>

        {/* Specs */}
        <div className="flex gap-2 flex-wrap mb-3">
          {[
            { icon: "⚡", val: `${car.hp} hp` },
            { icon: "⛽", val: `${car.mpg} mpg` },
            { icon: "👤", val: `${car.seats} seats` },
          ].map((spec) => (
            <span key={spec.val} className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-xs text-zinc-400">
              <span className="text-xs">{spec.icon}</span>{spec.val}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={car.rating} />
          <span className="text-xs text-zinc-500">{car.rating} ({car.reviews} reviews)</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-yellow-400 font-semibold text-lg">${car.price.toLocaleString()}</span>
            {car.oldPrice && (
              <span className="text-zinc-600 text-xs line-through ml-2">${car.oldPrice.toLocaleString()}</span>
            )}
          </div>
     
        </div>
      </div>

      {/* Hover detail panel */}
      <div
        className="absolute inset-0 bg-zinc-900 bg-opacity-95 flex flex-col items-center justify-center gap-3 transition-all duration-300 rounded-2xl"
        style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
      >
        <div className="text-yellow-400 font-semibold text-base">{car.name}</div>
        <div className="text-zinc-400 text-xs">{car.sub}</div>
        <div className="grid grid-cols-2 gap-2 mt-1 w-48">
          {[
            ["Power", `${car.hp} hp`],
            ["Efficiency", `${car.mpg} mpg`],
            ["Seats", car.seats],
            ["Year", car.year],
          ].map(([label, val]) => (
            <div key={label} className="bg-zinc-800 rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-zinc-500">{label}</div>
              <div className="text-sm text-zinc-100 font-medium">{val}</div>
            </div>
          ))}
        </div>
        <div className="mt-1">
          <span className="text-yellow-400 text-xl font-semibold">${car.price.toLocaleString()}</span>
        </div>
        <div className="flex gap-2 mt-1">
          <button className="bg-yellow-400 text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors">
            Book Test Drive
          </button>
          <button className="border border-zinc-600 text-zinc-300 text-xs px-4 py-2 rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-colors">
            Save
          </button>

          
        </div>

             <button
            className="text-yellow-400 border border-yellow-400 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
         <NavLink to={`/car/${car.id}`}>View Details →</NavLink>
          </button>
      </div>
      <button
            className="flex md:hidden m-3 text-yellow-400 border border-yellow-400 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
         <NavLink to={`/car/${car.id}`}>View Details →</NavLink>
          </button>
    </div>
  );
}

export default function CarListings() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("");

  const filtered = cars.filter((c) =>
    activeFilter === "All" ? true : c.type === activeFilter.toLowerCase()
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "year") return b.year - a.year;
    return 0;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
          Premium <span className="text-yellow-400">Auto</span> Listings
        </h1>
        <p className="text-zinc-500 text-sm mt-2">Discover your next drive from our curated collection</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeFilter === f
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-yellow-400 hover:text-yellow-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-6 px-1">
        <span className="text-zinc-500 text-sm">Showing {sorted.length} vehicle{sorted.length !== 1 ? "s" : ""}</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-sm px-3 py-2 rounded-lg outline-none cursor-pointer hover:border-yellow-400 transition-colors"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year">Newest First</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {sorted.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        {sorted.length === 0 && (
          <div className="col-span-full text-center text-zinc-600 py-16 text-sm">
            No vehicles found for this category.
          </div>
        )}
      </div>
    </div>
  );
}