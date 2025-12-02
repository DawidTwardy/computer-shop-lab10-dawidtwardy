export default function Home() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <main id="home" className="text-center p-10 bg-white/5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm max-w-3xl w-full mx-4">
        {/* Usunięto logo PK - treść zachowana zgodnie z prośbą */}
        <div className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#e5e5e1] to-[#bcbcb7] drop-shadow-sm py-4">
          Witaj na stronie sklepu komputerowego 2025DT!
        </div>
      </main>
    </div>
  );
}