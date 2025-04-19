import SpotifyPlayer from "@/components/SpotifyPlayer/SpotifyPlayer";
import TourDatesAPI from "@/components/TourDates/TourDatesAPI";
import Image from "next/image";
import Link from "next/link";

export interface AppConfig {
  id: number;
  title: string;
  icon: string;
  showInNavbar?: boolean;
  resizable?: boolean;
  initialSize?: { width: number; height: number };
  header?: React.ReactNode;
  windowContent: React.ReactNode;
}

export const appWindows: AppConfig[] = [
  {
    id: 1,
    title: "Welcome",
    icon: "/icons/eye.png",
    resizable: false,
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
        <div className="mt-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Font Samples:</h3>
            <div className="font-charcoal text-lg">
              <p>This is Charcoal font - ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p>abcdefghijklmnopqrstuvwxyz 0123456789</p>
            </div>
            <div className="font-chicago text-lg">
              <p>This is Chicago font - ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p>abcdefghijklmnopqrstuvwxyz 0123456789</p>
            </div>
            <div className="font-geneva text-lg">
              <p>This is Geneva font - ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p>abcdefghijklmnopqrstuvwxyz 0123456789</p>
            </div>
            <div className="font-garamond text-lg">
              <p>This is Garamond font - ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p>abcdefghijklmnopqrstuvwxyz 0123456789</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Music",
    icon: "/icons/itunes.png",
    showInNavbar: true,
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
    showInNavbar: true,
    initialSize: { width: 600, height: 500 },
    header: (
      <div className="flex flex-row items-center gap-6 font-bold font-geneva italic underline text-blue-700">
        <Link href="https://www.bandsintown.com/a/15547654-remi.fr?came_from=257">
          Bandsintown
        </Link>
      </div>
    ),
    windowContent: <TourDatesAPI />,
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
  {
    id: 6,
    title: "Archery",
    icon: "/icons/game.png",
    initialSize: { width: 800, height: 600 },
    windowContent: <></>,
  },
  {
    id: 7,
    title: "Contact",
    icon: "/icons/contact.png",
    showInNavbar: true,
    header: (
      <div className="flex flex-wrap items-center gap-x-4 font-bold font-geneva italic underline text-blue-700">
        <Link href="https://www.instagram.com/remi.fr_/">Instagram</Link>
        <Link href="https://www.youtube.com/@remifr">Youtube</Link>
        <Link href="https://open.spotify.com/intl-de/artist/4cMM2GVDpzC18xqyBUoy2w?si=gMruPFubQNOzEr8l-ZWd_A">
          Spotify
        </Link>
        <Link href="https://music.apple.com/de/artist/r%C3%A9mi-fr/1523575658">
          Apple Music
        </Link>
        <Link href="https://www.bandsintown.com/a/15547654-remi.fr?came_from=257">
          Bandsintown
        </Link>
      </div>
    ),
    windowContent: (
      <div className="h-full w-full flex items-center justify-center">
        <div className="space-y-6">
          <div>
            <h3 className="font-garamond text-5xl">Management</h3>
            <Link
              href={"mailto:mngmt@pierrenoire.de"}
              className="font-semibold font-geneva text-lg underline text-blue-700"
            >
              mngmt@pierrenoire.de
            </Link>
          </div>
          <div>
            <h3 className="font-garamond text-5xl">Booking</h3>
            <Link
              href={"mailto:till.wichmann@gastspielreisen.com"}
              className="font-semibold font-geneva text-lg underline text-blue-700"
            >
              till.wichmann@gastspielreisen.com
            </Link>
          </div>
        </div>
      </div>
    ),
  },
];
