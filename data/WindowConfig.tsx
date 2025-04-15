import SpotifyPlayer from "@/components/SpotifyPlayer/SpotifyPlayer";
import Image from "next/image";
import Link from "next/link";

export interface AppConfig {
  id: number;
  title: string;
  icon: string;
  initialSize?: { width: number; height: number };
  header?: React.ReactNode;
  windowContent: React.ReactNode;
}

// Zentrale Datenstruktur für alle Apps
export const appWindows: AppConfig[] = [
  {
    id: 1,
    title: "Welcome",
    icon: "/icons/eye.png",
    initialSize: { width: 500, height: 300 },
    header: (
      <div className="flex flex-row items-center gap-6 font-bold font-geneva italic underline text-blue-700">
        <Link href="https://www.instagram.com/remi.fr_/">Instagram</Link>
        <Link href="https://www.youtube.com/@remifr">Youtube</Link>
      </div>
    ),
    windowContent: (
      <div className="space-y-4 p-4">
        <h1 className="text-4xl font-bold font-garamond">C'est Rèmi</h1>
        <p>
          21-jähriger Kunde aus dem Dresdner Hechtviertel, 01097. Bilingualität
          durch französiche Eltern und ostdeutsche Kindergärtner.{" "}
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Music",
    icon: "/icons/itunes.png",
    initialSize: { width: 400, height: 500 },
    header: (
      <div className="flex flex-row items-center gap-6 font-bold font-geneva italic underline text-blue-700">
        <Link href="https://open.spotify.com/intl-de/artist/4cMM2GVDpzC18xqyBUoy2w?si=gMruPFubQNOzEr8l-ZWd_A">
          Spotify
        </Link>
        <Link href="https://music.apple.com/de/artist/r%C3%A9mi-fr/1523575658">
          Apple Music
        </Link>
      </div>
    ),
    windowContent: <SpotifyPlayer />,
  },
  {
    id: 3,
    title: "Tour",
    icon: "/icons/world-pointer.png",
    initialSize: { width: 350, height: 400 },
    header: <p>Hello</p>,
    windowContent: (
      <div className="h-full flex flex-col items-center justify-center p-4 bg-system-1 text-center">
        <Image
          src="/icons/itunes.png"
          alt="Music Note"
          width={50}
          height={50}
        />
        <p className="mt-4 font-bold text-2xl">♪ Music Player ♪</p>
        <div className="mt-6 p-3 bg-white border border-system-4 rounded">
          <p className="italic text-lg font-garamond">
            "Yesterday, all my troubles seemed so far away
            <br />
            Now it looks as though they're here to stay
            <br />
            Oh, I believe in yesterday"
          </p>
          <p className="mt-2 text-xs">- The Beatles</p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Trash",
    icon: "/icons/trash.png",
    initialSize: { width: 400, height: 250 },
    windowContent: (
      <div className="h-full w-full flex items-center justify-center">
        <Image src="/collage/remi_1.png" alt="Trash" layout="fill" />
      </div>
    ),
  },
  {
    id: 5,
    title: "Notes",
    icon: "/icons/notepad.png",
    initialSize: { width: 350, height: 400 },
    windowContent: (
      <div className="h-full p-2">
        <textarea
          className="w-full h-full p-2 border-none resize-none focus:outline-none"
          placeholder="Notizen hier eingeben..."
        />
      </div>
    ),
  },
];
