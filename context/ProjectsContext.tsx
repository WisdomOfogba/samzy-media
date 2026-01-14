"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Project {
  id: string
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
        const res = await fetch("/api/portfolio") // Your API endpoint
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
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
