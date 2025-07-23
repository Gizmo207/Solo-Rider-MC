type Props = {
  title: string;
  thumbnail_url: string;
  price: string;
};

export default function InteractiveGearCard({ title, thumbnail_url, price }: Props) {
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden p-6 hover:scale-105 transition-transform duration-300 border-2 border-black">
      <img
        src={thumbnail_url}
        alt={title}
        className="w-full h-64 object-contain mb-4 bg-gray-100"
      />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg text-gray-800">${price}</p>
    </div>
  );
}
