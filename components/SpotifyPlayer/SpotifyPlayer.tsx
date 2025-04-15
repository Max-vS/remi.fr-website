"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface SpotifyAlbumResponse {
  id: string;
  name: string;
  album_type: string;
  images: { url: string; height: number; width: number }[];
  release_date: string;
  uri: string;
  total_tracks: number;
}

interface SpotifyAlbumsResponse {
  items: SpotifyAlbumResponse[];
}

const REMI_FR_ARTIST_ID = "4cMM2GVDpzC18xqyBUoy2w";
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || "";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const ARTIST_ALBUMS_ENDPOINT = `https://api.spotify.com/v1/artists/${REMI_FR_ARTIST_ID}/albums`;

// Individual album component with loading state
const AlbumEmbed = ({ album }: { album: SpotifyAlbumResponse }) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsIframeLoading(false);
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, []);

  const getAlbumTypeLabel = (type: string) => {
    switch (type) {
      case "album":
        return "Album";
      case "single":
        return "Single";
      case "ep":
        return "EP";
      default:
        return type;
    }
  };

  const height = album.total_tracks > 1 ? "380" : "152";

  return (
    <div className="flex flex-col">
      <div className="px-2 py-1 text-sm font-semibold">
        <p className="truncate">{album.name}</p>
        <p className="text-xs opacity-70">
          {getAlbumTypeLabel(album.album_type)} ·{" "}
          {album.release_date.split("-")[0]} · {album.total_tracks} tracks
        </p>
      </div>

      <div className="relative" style={{ height: `${height}px` }}>
        {isIframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={`https://open.spotify.com/embed/album/${album.id}?utm_source=generator`}
          width="100%"
          height={height}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`${album.name} by Remi.fr`}
          className="relative z-10"
        />
      </div>
    </div>
  );
};

const SpotifyPlayer = () => {
  const [albums, setAlbums] = useState<SpotifyAlbumResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  // Fetch Spotify data
  const fetchAccessToken = useCallback(async () => {
    // Return cached token if available
    if (tokenRef.current) return tokenRef.current;

    try {
      const authParameters = new URLSearchParams();
      authParameters.append("grant_type", "client_credentials");
      authParameters.append("client_id", CLIENT_ID);
      authParameters.append("client_secret", CLIENT_SECRET);

      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: authParameters,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.status}`);
      }

      const data = await response.json();
      tokenRef.current = data.access_token;
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      setError("Failed to authenticate with Spotify");
      return null;
    }
  }, []);

  const fetchAlbums = useCallback(async (accessToken: string) => {
    try {
      const response = await fetch(
        `${ARTIST_ALBUMS_ENDPOINT}?include_groups=album,single,ep&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch albums: ${response.status}`);
      }

      const data: SpotifyAlbumsResponse = await response.json();

      return data.items.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    } catch (error) {
      console.error("Error fetching albums:", error);
      setError("Failed to load albums from Spotify");
      return [];
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = await fetchAccessToken();
        if (!token) return;

        const albumsData = await fetchAlbums(token);
        if (isMounted) {
          setAlbums(albumsData);
        }
      } catch (err) {
        if (isMounted) {
          setError("An unexpected error occurred");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchAccessToken, fetchAlbums]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        No albums found
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto p-4 gap-4">
      {albums.map((album) => (
        <div key={album.id}>
          <AlbumEmbed album={album} />
        </div>
      ))}
    </div>
  );
};

export default SpotifyPlayer;
