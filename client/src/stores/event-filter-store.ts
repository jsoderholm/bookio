import type { Range } from "@/lib/common/types"
import { getStartOfFirstWeek } from "@/lib/utils"
import { create } from "zustand"
import { useShallow } from "zustand/react/shallow"

export type EventFilter = {
  firstDay: Date
  range: Range
}

interface EventFilterState {
  applied: EventFilter
  actions: {
    addFilter: (filter: EventFilter) => void
  }
}

const useEventFilterStore = create<EventFilterState>()((set) => ({
  applied: {
    firstDay: getStartOfFirstWeek(new Date()),
    range: "month",
  },
  actions: {
    addFilter: (filter: EventFilter) =>
      set((state) => ({ applied: { ...state.applied, ...filter } })),
  },
}))

export const useAppliedEventFilters = () =>
  useEventFilterStore(
    useShallow((state) => ({
      firstDay: state.applied.firstDay,
      range: state.applied.range,
    })),
  )

export const useEventFilterActions = () =>
  useEventFilterStore((state) => state.actions)
