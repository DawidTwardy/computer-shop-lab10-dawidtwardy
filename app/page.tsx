import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main id="home">
        <Image
          className="logo"
          src="/politechnika-krakowska-logo.svg"
          alt="Logo Politechniki Krakowskiej"
          width={100}
          height={100}
          priority
        />
        <div>
          Witaj na stronie sklepu komputerowego 2025DT!
        </div>
        </main>
        </div>
  );
}
