import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/groups")({
  component: () => (
    <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />

      <div className="mb-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 h-96" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
      </div>
      <div className="mb-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 h-96" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
      </div>
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />

      <div className="mb-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 h-96" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
      </div>
      <div className="mb-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 h-96" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
        <div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
      </div>
    </div>
  ),
})
