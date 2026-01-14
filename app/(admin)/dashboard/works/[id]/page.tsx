"use client"

import { useParams } from "next/navigation"
import { WorkForm } from "@/components/dashboard/work-form"

export default function EditWorkPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Work</h1>
        <p className="text-muted-foreground mt-1">Update your portfolio project</p>
      </div>
      <WorkForm workId={id} />
    </div>
  )
}
