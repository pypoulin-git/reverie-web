"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase-browser";
import type { Dream } from "@/types/dream";
import { DEMO_MODE } from "@/lib/constants";
import { DEMO_DREAMS } from "@/lib/demo-data";

export function useDreams() {
  return useQuery<Dream[]>({
    queryKey: ["dreams"],
    queryFn: async () => {
      if (DEMO_MODE) return DEMO_DREAMS;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("dreams")
        .select("*")
        .order("dream_date", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as Dream[];
    },
  });
}

export function useDream(id: string) {
  return useQuery<Dream>({
    queryKey: ["dream", id],
    queryFn: async () => {
      if (DEMO_MODE) {
        const dream = DEMO_DREAMS.find((d) => d.id === id);
        if (!dream) throw new Error("Dream not found");
        return dream;
      }
      const supabase = createClient();
      const { data, error } = await supabase
        .from("dreams")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Dream;
    },
  });
}

export function useDreamsByMonth(year: number, month: number) {
  return useQuery<Dream[]>({
    queryKey: ["dreams", "month", year, month],
    queryFn: async () => {
      if (DEMO_MODE) {
        return DEMO_DREAMS.filter((d) => {
          const date = new Date(d.dream_date);
          return date.getFullYear() === year && date.getMonth() === month;
        });
      }
      const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
      const endDate = new Date(year, month + 1, 0);
      const end = `${year}-${String(month + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

      const supabase = createClient();
      const { data, error } = await supabase
        .from("dreams")
        .select("*")
        .gte("dream_date", start)
        .lte("dream_date", end)
        .order("dream_date", { ascending: false });
      if (error) throw error;
      return data as Dream[];
    },
  });
}

export function useCreateDream() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dream: Partial<Dream>) => {
      if (DEMO_MODE) {
        return { ...DEMO_DREAMS[0], ...dream, id: `demo-${Date.now()}` };
      }
      const supabase = createClient();
      const { data, error } = await supabase
        .from("dreams")
        .insert(dream)
        .select()
        .single();
      if (error) throw error;
      return data as Dream;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dreams"] });
    },
  });
}
