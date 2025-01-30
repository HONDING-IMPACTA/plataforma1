"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlusCircle, Trash2, Download, Trophy, ChevronDown, ChevronUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"

type GoalType = "short" | "medium" | "long"

interface Goal {
  id: string
  description: string
  timeline: string
  completed: boolean
}

interface Project {
  id: string
  type: GoalType
  title: string
  description: string
  goals: Goal[]
}

export function LifeProjectPlanner() {
  const [projects, setProjects] = useState<Project[]>([])
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const savedProjects = localStorage.getItem("lifeProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("lifeProjects", JSON.stringify(projects))
    const totalGoals = projects.reduce((sum, project) => sum + project.goals.length, 0)
    const completedGoals = projects.reduce(
      (sum, project) => sum + project.goals.filter((goal) => goal.completed).length,
      0,
    )
    const newPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0
    setCompletionPercentage(newPercentage)

    if (newPercentage === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      toast({
        title: "¡Felicidades!",
        description: "Has completado todos tus objetivos en tu Plan de Vida. ¡Sigue así!",
      })
    }
  }, [projects, toast])

  const addProject = (type: GoalType) => {
    const newProject: Project = {
      id: Date.now().toString(),
      type,
      title: "",
      description: "",
      goals: [],
    }
    setProjects([...projects, newProject])
    setExpandedProject(newProject.id)
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const addGoal = (projectId: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      description: "",
      timeline: "",
      completed: false,
    }
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, goals: [...project.goals, newGoal] } : project,
      ),
    )
  }

  const updateGoal = (projectId: string, goalId: string, field: keyof Goal, value: string | boolean) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              goals: project.goals.map((goal) => (goal.id === goalId ? { ...goal, [field]: value } : goal)),
            }
          : project,
      ),
    )
  }

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const removeGoal = (projectId: string, goalId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              goals: project.goals.filter((goal) => goal.id !== goalId),
            }
          : project,
      ),
    )
  }

  const exportProjects = () => {
    const projectsText = projects
      .map(
        (project) => `
Tipo: ${project.type}
Título: ${project.title}
Descripción: ${project.description}
Metas:
${project.goals
  .map(
    (goal) => `- ${goal.description}
  Tiempo: ${goal.timeline}
  Estado: ${goal.completed ? "Completado" : "Pendiente"}
`,
  )
  .join("\n")}
`,
      )
      .join("\n---\n")

    const blob = new Blob([projectsText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mi_plan_de_vida.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Plan de Vida exportado",
      description: "Tu Plan de Vida ha sido descargado como un archivo de texto.",
    })
  }

  const renderProjectInputs = (type: GoalType) => {
    return projects
      .filter((project) => project.type === type)
      .map((project) => (
        <Card
          key={project.id}
          className={`mb-4 ${project.goals.every((goal) => goal.completed) ? "bg-green-100" : ""}`}
        >
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, "title", e.target.value)}
                  placeholder="Título del proyecto"
                  className="font-bold text-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                >
                  {expandedProject === project.id ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Describe tu proyecto"
              />
              <AnimatePresence>
                {expandedProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-semibold mb-2">Metas del Proyecto</h4>
                    {project.goals.map((goal) => (
                      <div key={goal.id} className="mb-4 p-4 border rounded">
                        <div className="space-y-2">
                          <Input
                            value={goal.description}
                            onChange={(e) => updateGoal(project.id, goal.id, "description", e.target.value)}
                            placeholder="Describe tu meta"
                          />
                          <Input
                            value={goal.timeline}
                            onChange={(e) => updateGoal(project.id, goal.id, "timeline", e.target.value)}
                            placeholder="Tiempo estimado"
                          />
                          <div className="flex justify-between items-center">
                            <Button variant="destructive" size="sm" onClick={() => removeGoal(project.id, goal.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Eliminar Meta
                            </Button>
                            <Button
                              variant={goal.completed ? "outline" : "default"}
                              size="sm"
                              onClick={() => updateGoal(project.id, goal.id, "completed", !goal.completed)}
                            >
                              {goal.completed ? "Marcar como Pendiente" : "Marcar como Completado"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => addGoal(project.id)} variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" /> Agregar Meta
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-between items-center mt-4">
                <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar Proyecto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tu Progreso</h2>
        <Button onClick={exportProjects} variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exportar Plan de Vida
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Completado: {completionPercentage.toFixed(0)}%</span>
            <Trophy className={`h-6 w-6 ${completionPercentage === 100 ? "text-yellow-500" : "text-gray-300"}`} />
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos a Corto Plazo (1-2 años)</CardTitle>
        </CardHeader>
        <CardContent>
          {renderProjectInputs("short")}
          <Button onClick={() => addProject("short")} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Proyecto a Corto Plazo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos a Mediano Plazo (2-5 años)</CardTitle>
        </CardHeader>
        <CardContent>
          {renderProjectInputs("medium")}
          <Button onClick={() => addProject("medium")} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Proyecto a Mediano Plazo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos a Largo Plazo (5+ años)</CardTitle>
        </CardHeader>
        <CardContent>
          {renderProjectInputs("long")}
          <Button onClick={() => addProject("long")} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Proyecto a Largo Plazo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

