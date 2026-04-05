"use client";

import { useState } from "react";
import { useDreamsByMonth } from "@/hooks/useDreams";
import DreamCard from "@/components/DreamCard";
import { EMOTIONS } from "@/lib/constants";
import type { EmotionKey } from "@/lib/constants";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import type { Dream } from "@/types/dream";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function JournalPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { data: dreams } = useDreamsByMonth(year, month);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday-based offset (0=Mon, 6=Sun)
  const startOffset = (getDay(monthStart) + 6) % 7;

  const dreamsForDate = (date: Date): Dream[] =>
    dreams?.filter((d) => isSameDay(new Date(d.dream_date), date)) || [];

  const dominantEmotion = (date: Date): string | null => {
    const dayDreams = dreamsForDate(date);
    if (dayDreams.length === 0) return null;
    const all = dayDreams.flatMap((d) => d.emotions);
    if (all.length === 0) return null;
    // Return most frequent
    const counts: Record<string, number> = {};
    all.forEach((e) => (counts[e] = (counts[e] || 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const selectedDreams = selectedDate ? dreamsForDate(selectedDate) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1
        className="text-lg font-bold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Journal
      </h1>

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="btn-secondary px-3 py-1.5 text-sm"
        >
          &larr;
        </button>
        <h2 className="text-sm font-semibold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: fr })}
        </h2>
        <button
          onClick={nextMonth}
          className="btn-secondary px-3 py-1.5 text-sm"
        >
          &rarr;
        </button>
      </div>

      {/* Calendar grid */}
      <div className="glass p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-medium py-1"
              style={{ color: "var(--text-muted)" }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const emotion = dominantEmotion(day);
            const hasDreams = dreamsForDate(day).length > 0;
            const isSelected =
              selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className="relative aspect-square flex items-center justify-center rounded-lg text-xs transition-colors"
                style={{
                  background: isSelected
                    ? "rgba(99,102,241,0.2)"
                    : "transparent",
                  color: isToday
                    ? "var(--accent-indigo)"
                    : "var(--text-primary)",
                  fontWeight: isToday ? 600 : 400,
                }}
              >
                {format(day, "d")}
                {hasDreams && emotion && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        EMOTIONS[emotion as EmotionKey]?.color ||
                        "var(--accent-indigo)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected date dreams */}
      {selectedDate && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            {format(selectedDate, "EEEE d MMMM", { locale: fr })}
            {selectedDreams.length > 0 && (
              <span className="ml-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
                {selectedDreams.length} reve{selectedDreams.length > 1 ? "s" : ""}
              </span>
            )}
          </h3>

          {selectedDreams.length > 0 ? (
            selectedDreams.map((dream) => (
              <DreamCard key={dream.id} dream={dream} />
            ))
          ) : (
            <div className="glass-subtle p-4 text-center">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Aucun reve consigne ce jour.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
