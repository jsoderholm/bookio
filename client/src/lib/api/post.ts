import type { CreatePost } from "../../../../common/types/post"
import { api } from "./api"

export async function getPosts() {
  const res = await api.posts.$get()
  if (!res.ok) {
    throw new Error("server error")
  }
  const posts = await res.json()
  return posts
}

export async function getPost({ id }: { id: number }) {
  const res = await api.posts[":id{[0-9]+}"].$get({
    param: { id: id.toString() },
  })
  if (!res.ok) {
    throw new Error("server error")
  }
  const post = await res.json()
  return post
}

export async function createPost({ value }: { value: CreatePost }) {
  const res = await api.posts.$post({ json: value })
  if (!res.ok) {
    throw new Error("server error")
  }

  const post = await res.json()
  return post
}

export async function deletePost({ id }: { id: number }) {
  const res = await api.posts[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error("server error")
  }
}
