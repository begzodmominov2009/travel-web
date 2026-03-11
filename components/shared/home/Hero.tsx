"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { TourType } from "@/types/TourType";

type RoomType = {
  id: number;
  adults: number;
  children: number;
};

type Props = {
  res: TourType[];
};

const Hero = ({ res }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 2, 11),
    to: new Date(2026, 2, 18),
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [rooms, setRooms] = useState<RoomType[]>([
    { id: 1, adults: 2, children: 0 },
  ]);

  const addRoom = () => {
    setRooms([...rooms, { id: Date.now(), adults: 2, children: 0 }]);
  };

  const removeRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const updateRoom = (
    id: number,
    field: "adults" | "children",
    value: number,
  ) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, [field]: value } : room,
      ),
    );
  };

  const totalGuests = rooms.reduce(
    (acc, room) => acc + room.adults + room.children,
    0,
  );

  // TOUR FILTER
  const filteredTours = res.filter((tour) =>
    tour.title.toLowerCase().includes(search.toLowerCase()),
  );

  // OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (calendarRef.current && !calendarRef.current.contains(target)) {
        setOpenCalendar(false);
      }

      if (guestsRef.current && !guestsRef.current.contains(target)) {
        setOpenGuests(false);
      }

      if (searchRef.current && !searchRef.current.contains(target)) {
        setOpenSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative w-full h-screen rounded-b-3xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.9dXEUxBTm42RMeQLeWloVAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d7ca6]/80 to-[#0d7ca6]/60" />
      </div>

      <div className="relative z-40 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-white text-[20px] md:text-[48px] font-extrabold tracking-wide mb-10">
          EXPLORE UNBEATABLE HOTEL RATES
        </h1>

        {/* Search Bar */}
        <div className="relative bg-white rounded-full shadow-xl flex flex-col md:flex-row items-center w-full max-w-5xl">
          {/* TOUR SEARCH */}
          <div className="relative flex-1" ref={searchRef}>
            <input
              type="text"
              placeholder="Search tour..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenSearch(true);
              }}
              className="flex-1 px-6 py-4 outline-none text-gray-700 w-full rounded-full md:rounded-none"
            />

            {openSearch && search && (
              <div className="absolute top-18 left-0 w-full bg-white shadow-2xl rounded-2xl max-h-[260px] overflow-y-auto z-50">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <div
                      key={tour.id}
                      onClick={() => {
                        setSearch(tour.title);
                        setOpenSearch(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={tour.cover_image}
                        className="w-16 h-12 object-cover rounded-md"
                      />

                      <div className="text-left">
                        <p className="text-sm font-semibold">{tour.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          City • {tour.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-500">No tours found</p>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:block h-10 w-px bg-gray-200" />

          {/* DATE */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => {
                setOpenCalendar(!openCalendar);
                setOpenGuests(false);
              }}
              className="px-6 py-4 cursor-pointer whitespace-nowrap"
            >
              {range?.from ? format(range.from, "dd MMM yyyy") : "Check in"} -{" "}
              {range?.to ? format(range.to, "dd MMM yyyy") : "Check out"}
            </button>

            {openCalendar && (
              <div className="absolute top-18 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 z-50">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                  pagedNavigation
                />
              </div>
            )}
          </div>

          <div className="hidden md:block h-10 w-px bg-gray-200" />

          {/* GUESTS */}
          {/* <div className="relative" ref={guestsRef}>
            <button
              onClick={() => {
                setOpenGuests(!openGuests);
                setOpenCalendar(false);
              }}
              className="px-6 py-4 cursor-pointer whitespace-nowrap"
            >
              {rooms.length} Room, {totalGuests} Guests
            </button>

            {openGuests && (
              <div className="absolute top-18 right-0 bg-white w-80 rounded-2xl shadow-2xl p-5 text-left">
                {rooms.map((room, index) => (
                  <div
                    key={room.id}
                    className="border-b pb-4 mb-4 last:border-none"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-sm">
                        Room {index + 1}
                      </h3>

                      {rooms.length > 1 && (
                        <button
                          onClick={() => removeRoom(room.id)}
                          className="text-red-500 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">Adults</span>

                        <div className="flex items-center gap-2 border rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              updateRoom(
                                room.id,
                                "adults",
                                Math.max(1, room.adults - 1),
                              )
                            }
                          >
                            -
                          </button>

                          <span>{room.adults}</span>

                          <button
                            onClick={() =>
                              updateRoom(room.id, "adults", room.adults + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">Children</span>

                        <div className="flex items-center gap-2 border rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              updateRoom(
                                room.id,
                                "children",
                                Math.max(0, room.children - 1),
                              )
                            }
                          >
                            -
                          </button>

                          <span>{room.children}</span>

                          <button
                            onClick={() =>
                              updateRoom(room.id, "children", room.children + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addRoom}
                  className="text-blue-600 text-sm font-medium mb-3"
                >
                  + Add room
                </button>

                <button
                  onClick={() => setOpenGuests(false)}
                  className="w-full bg-blue-900 text-white py-2 rounded-full text-sm"
                >
                  Save
                </button>
              </div>
            )}
          </div> */}

          {/* SEARCH BUTTON */}
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 font-semibold rounded-full m-2 hover:scale-105 transition">
            Search
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center text-white tracking-widest text-sm">
        DISCOVER THE BEST DEALS BY SCANNING HUNDREDS OF HOTEL SITES
      </div>
    </section>
  );
};

export default Hero;
