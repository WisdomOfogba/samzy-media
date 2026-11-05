"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Project {
  _id?: string
  id?: string
  title: string
  mediaUrl: string
  thumbnail: string
  category: string
  type: "image" | "video"
  featured: boolean
}

interface ProjectsContextType {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  loading: boolean
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio")
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          console.error("Malformed projects data received (expected array):", data)
          setProjects([])
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, loading }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
