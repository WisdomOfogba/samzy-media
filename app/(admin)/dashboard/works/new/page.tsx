"use client"

import { WorkForm } from "@/components/dashboard/work-form"

export default function NewWorkPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Work</h1>
        <p className="text-muted-foreground mt-1">Create a new portfolio project</p>
      </div>
      <WorkForm />
    </div>
  )
}
