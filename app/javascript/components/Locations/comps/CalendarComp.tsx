import React, { useState, useMemo, useEffect } from "react";
import { format, endOfWeek, addWeeks } from "date-fns";

import { getRequest, postRequest } from "../../../api";

import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { ScrollArea } from "../../ui/scroll-area";
import { RiLoader4Line } from "react-icons/ri";

type Slot = { time: string; available: boolean };

type Props = {
  field: any;
};

export default function CalendarComp({ field }: Props) {
  const today = new Date();
  const weekEnd = endOfWeek(addWeeks(today, 1));

  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  const tz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setTime(null);
      const day = format(date, "yyyy-MM-dd");
      const res = await getRequest<{ success: true; slots: Slot[] }>(
        `/fields/${field.id}/availability.json`,
        { date: day, tz }
      );
      
      if (res.success) {
        const wrapped = (res.data as any)?.slots as Slot[] | undefined;
        setSlots(wrapped ?? (res.data as unknown as Slot[]) ?? []);
      } else {
        console.error(res.errors?.join(", "));
        setSlots([]);
      }
      setLoading(false);
    };
    load();
  }, [date, field, tz]);


 const visibleSlots = useMemo(() => {
    if (!slots || slots.length === 0) return [];
    const selectedDay = format(date, "yyyy-MM-dd");
    const todayDay = format(today, "yyyy-MM-dd");

    if (selectedDay !== todayDay) return slots;

    const nowStr = format(today, "HH:mm"); 
    return slots.filter(({ time }) => (time ?? "").slice(0, 5) >= nowStr);
  }, [slots, date, today]);


  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!time) return;
    setLoading(true);

    const payload = {
      field_id: field.id,
      date: format(date, "yyyy-MM-dd"),
      hour: time,
      tz,
    };
    const resultt = await postRequest("/bookings", {
      book: {
        payload,
      },
    });
    setLoading(false);

    if (resultt.success && resultt.redirect_url) {
      setTime(null);
      const day = format(date, "yyyy-MM-dd");
      const fresh = await getRequest<{ success: true; slots: Slot[] }>(
        `/fields/${field.id}/availability.json`,
        { date: day, tz }
      );
      if (fresh.success) {
        const wrapped = (fresh.data as any)?.slots as Slot[] | undefined;
        setSlots(wrapped ?? (fresh.data as unknown as Slot[]) ?? []);
      }
      window.location.href = resultt.redirect_url;
    }
  };


  return (
    <div>
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col ">
          <div className="flex-1 w-full  ">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setTime(null);
                }
              }}
              className="flex py-4 w-full justify-center"
              disabled={[{ before: today }, { after: weekEnd }]}
            />
          </div>

          <div className="relative w-full max-sm:h-48 flex-1">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s w-full">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">
                      {format(date, "EEEE, d")}
                    </p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {visibleSlots.map(({ time: timeSlot, available }) => (
                      <Button
                        key={timeSlot}
                        variant="outline"
                        size="lg"
                        className={[
                          "w-full hover:cursor-pointer",
                          time === timeSlot
                            ? "bg-white text-black border-black"
                            : "",
                          available && time !== timeSlot
                            ? "hover:bg-white hover:text-black"
                            : "",
                        ].join(" ")}
                        onClick={() => setTime(timeSlot)}
                        disabled={!available}
                        aria-pressed={time === timeSlot}
                        aria-label={`Slot ${timeSlot} ${
                          available ? "available" : "unavailable"
                        }`}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                    {!loading && visibleSlots.length === 0 && (
                      <div className="px-5 py-2 text-sm opacity-75">
                        No slots for this day.
                      </div>
                    )}
                    {loading && (
                      <span className="px-5 py-2 text-sm opacity-75">
                        Loading…
                      </span>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      <button className=" pt-4 w-full  flex items-center justify-center" onClick={handleBook} disabled={!time}>
        <p
          className={`border-2 border-[#f9e7b8] text-[#f9e7b8] rounded py-2 px-4 font-bold ${
            !time || loading
              ? "hover:cursor-not-allowed"
              : " hover:cursor-pointer hover:bg-[#f9e7b8] hover:text-black "
          } `}
        >
          {loading ? <RiLoader4Line className=" loader text-2xl" /> : "Book"}
        </p>
      </button>
    </div>
  );
}
