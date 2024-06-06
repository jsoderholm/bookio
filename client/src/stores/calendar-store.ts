import type { Range } from "@/lib/common/types"
import { create } from "zustand"

interface CalendarState {
  activeMonth: Date
  range: Range
  actions: {
    setActiveMonth: (date: Date) => void
    setRange: (range: Range) => void
  }
}

const useCalendarStore = create<CalendarState>()((set) => ({
  activeMonth: new Date(),
  range: "month",
  actions: {
    setActiveMonth: (date: Date) => set({ activeMonth: date }),
    setRange: (range: Range) => set({ range }),
  },
}))

export const useActiveMonth = () =>
  useCalendarStore((state) => state.activeMonth)
export const useCalendarActions = () =>
  useCalendarStore((state) => state.actions)
