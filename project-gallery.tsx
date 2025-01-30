"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "App de Voluntariado Local",
    description: "Una aplicación para conectar voluntarios con organizaciones locales que necesitan ayuda.",
    image: "/projects/volunteer-app.jpg",
    tags: ["voluntariado", "local", "app"],
  },
  {
    id: "2",
    title: "Campaña de Reciclaje Escolar",
    description: "Iniciativa para promover el reciclaje y la conciencia ambiental en nuestra escuela.",
    image: "/projects/recycling-campaign.jpg",
    tags: ["reciclaje", "escuela", "medio ambiente"],
  },
]

export function ProjectGallery() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    tags: [],
  })

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { ...newProject, id: Date.now().toString() }])
      setNewProject({ title: "", description: "", image: "", tags: [] })
      setIsAddingProject(false)
    }
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis Proyectos</h2>
        <Button onClick={() => setIsAddingProject(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Proyecto
        </Button>
      </div>

      {isAddingProject && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Título</Label>
              <Input
                id="project-title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Descripción</Label>
              <Textarea
                id="project-description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-image">URL de la imagen</Label>
              <Input
                id="project-image"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-tags">Etiquetas</Label>
              <TagInput tags={newProject.tags} setTags={(tags) => setNewProject({ ...newProject, tags })} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingProject(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddProject}>Guardar Proyecto</Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                <Trash className="mr-2 h-4 w-4" /> Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

