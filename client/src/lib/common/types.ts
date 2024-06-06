export type BaseComponentProps = {
  className?: string
}

const ranges = ["week", "month", "year"]
export type Range = (typeof ranges)[number]

export type PagedRequestParams = {
  pagination?: { limit: number; offset: number }
}

export type SearchableRequestParams = {
  search?: string
}
