import type { CreateGroup } from "../../../../common/types/group"
import { api } from "./api"

export async function getGroups() {
  const res = await api.groups.$get()
  if (!res.ok) {
    throw new Error("server error")
  }
  const groups = await res.json()
  return groups
}

export async function getGroup({ id }: { id: number }) {
  const res = await api.groups[":id{[0-9]+}"].$get({
    param: { id: id.toString() },
  })
  if (!res.ok) {
    throw new Error("server error")
  }
  const group = await res.json()
  return group
}

export async function createGroup({ value }: { value: CreateGroup }) {
  const res = await api.groups.$post({ json: value })
  if (!res.ok) {
    throw new Error("server error")
  }

  const group = await res.json()
  return group
}

export async function deleteGroup({ id }: { id: number }) {
  const res = await api.groups[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error("server error")
  }
}
