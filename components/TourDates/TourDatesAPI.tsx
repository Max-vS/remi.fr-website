"use client";

import { format } from "date-fns";
import { buttonVariants } from "../Button";
import Link from "next/link";
import useSWR from "swr";

interface Offer {
  type: string;
  url: string;
  status: string;
}

interface Venue {
  name: string;
  city: string;
  country: string;
  region: string;
  latitude: string;
  longitude: string;
}

interface Event {
  id: string;
  url: string;
  datetime: string;
  title: string;
  description: string;
  artist: {
    name: string;
    url: string;
    mbid: string;
    image_url: string;
  };
  venue: Venue;
  lineup: string[];
  offers: Offer[];
  on_sale_datetime: string;
}

const APP_ID = process.env.NEXT_PUBLIC_BANDSINTOWN_API_KEY;
const ARTIST_ID = "15547654";

const fetcher = async (url: string): Promise<Event[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return format(date, "MMM d, yyyy, h:mm a");
  } catch (e) {
    return dateStr;
  }
};

const TourDatesAPI = () => {
  const {
    data: events = [],
    error,
    isLoading,
  } = useSWR<Event[]>(
    `https://rest.bandsintown.com/artists/id_${ARTIST_ID}/events?app_id=${APP_ID}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 600000,
      refreshInterval: 0,
    }
  );

  return (
    <div className="w-full h-full overflow-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>
            Error:{" "}
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-10 text-lg text-system-4">
          No upcoming events.
        </div>
      ) : (
        <div className="space-y-1">
          {events.map((event: Event) => (
            <div
              key={event.id}
              className="bg-system-1 p-3 flex justify-between items-start flex-row gap-3"
            >
              <div>
                <p className="text-lg">{formatDate(event.datetime)}</p>
                <p>{event.venue.name}</p>
                <p className="text-system-5">
                  {event.venue.city},{" "}
                  {event.venue.region && `${event.venue.region}, `}
                  {event.venue.country}
                </p>
              </div>
              <div className="flex flex-col items-end">
                {event.offers && event.offers.length > 0 ? (
                  <Link
                    className={buttonVariants({ variant: "default" })}
                    href={event.offers[0]?.url || "#"}
                  >
                    TICKETS
                  </Link>
                ) : (
                  <Link
                    className={buttonVariants()}
                    href={`${event.url}&trigger=notify_me`}
                  >
                    NOTIFY ME
                  </Link>
                )}
                <Link
                  className={buttonVariants()}
                  href={`${event.url}&trigger=rsvp_going`}
                >
                  RSVP
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourDatesAPI;
