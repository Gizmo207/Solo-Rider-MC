export default function Navigation() {
  return (
    <nav className="w-full py-4 px-6 bg-solo-black border-b border-solo-red flex items-center justify-between">
      <div className="text-white font-bold text-xl">Solo Riders MC</div>
      <div className="space-x-6">
        <a href="/" className="text-gray-300 hover:text-solo-red transition">Home</a>
        <a href="/shop" className="text-gray-300 hover:text-solo-red transition">Shop</a>
        <a href="/blog" className="text-gray-300 hover:text-solo-red transition">Blog</a>
        <a href="/events" className="text-gray-300 hover:text-solo-red transition">Events</a>
      </div>
    </nav>
  );
}
