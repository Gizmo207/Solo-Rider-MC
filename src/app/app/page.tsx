export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="h-screen snap-start flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl">[Hero Scene: Full Bike Idle]</h1>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-red-900 text-white">
        <h1 className="text-4xl">[Engine Block: Fire + Heat]</h1>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-neutral-800 text-white">
        <h1 className="text-4xl">[Exhaust Scene: Smoke Pulse]</h1>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl">[Gas Tank: Club Logo Reveal]</h1>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl">[Handlebars: Control in Grip]</h1>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-zinc-800 text-white">
        <h1 className="text-4xl">[Seat: Brotherhood Rides Here]</h1>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-[#111111] text-white">
        <h1 className="text-4xl">[Rear Tire: Burnout Finale]</h1>
      </section>
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl mb-4">JOIN THE RIDE</h1>
        <button className="px-6 py-3 bg-white text-black rounded hover:bg-red-700 transition">Enter the Club</button>
      </section>
    </main>
  );
}
