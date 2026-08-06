export default function PageHero({
  badge,
  title,
  description,
  features = [],
}) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 p-10 text-white">

      <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
        {badge}
      </span>

      <h1 className="text-5xl font-bold mt-6">
        {title}
      </h1>

      <p className="mt-5 text-blue-100 text-lg leading-8 max-w-4xl">
        {description}
      </p>

      <div className="flex flex-wrap gap-4 mt-8">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/20 px-5 py-3 rounded-xl"
          >
            {feature}
          </div>
        ))}

      </div>

    </div>
  );
}