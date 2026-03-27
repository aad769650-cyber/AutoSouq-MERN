import { motion } from "framer-motion";

const items = [
  "React",
  "Node",
  "MongoDB",
  "Express",
  "Next.js",
  "Tailwind"
];

export default function InfiniteScroll() {

  const loopItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-10 bg-gray-100">

      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 12
        }}
      >
        {loopItems.map((item, index) => (
          <div
            key={index}
            className="min-w-50 md:min-w-65 h-30 flex items-center justify-center bg-blue-500 text-white rounded-xl shadow-lg"
          >
            {item}
          </div>
        ))}
      </motion.div>

    </div>
  );
}