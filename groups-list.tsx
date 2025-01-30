"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Users } from "lucide-react"

interface Group {
  id: string
  name: string
  description: string
  members: number
  tags: string[]
}

const initialGroups: Group[] = [
  {
    id: "1",
    name: "Innovadores Tecnológicos",
    description: "Grupo para estudiantes interesados en tecnología y desarrollo de software.",
    members: 25,
    tags: ["tecnología", "software", "estudiantes"],
  },
  {
    id: "2",
    name: "Líderes Ambientales",
    description: "Enfocados en proyectos de conservación y sostenibilidad en nuestra comunidad.",
    members: 18,
    tags: ["medio ambiente", "sostenibilidad", "conservación"],
  },
]

export function GroupsList() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroup, setNewGroup] = useState<Omit<Group, "id" | "members">>({
    name: "",
    description: "",
    tags: [],
  })

  const handleAddGroup = () => {
    if (newGroup.name && newGroup.description) {
      setGroups([...groups, { ...newGroup, id: Date.now().toString(), members: 1 }])
      setNewGroup({ name: "", description: "", tags: [] })
      setIsAddingGroup(false)
    }
  }

  const handleJoinGroup = (id: string) => {
    setGroups(groups.map((group) => (group.id === id ? { ...group, members: group.members + 1 } : group)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grupos</h2>
        <Button onClick={() => setIsAddingGroup(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Grupo
        </Button>
      </div>

      {isAddingGroup && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Grupo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Nombre del Grupo</Label>
              <Input
                id="group-name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-description">Descripción</Label>
              <Textarea
                id="group-description"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-tags">Etiquetas</Label>
              <Input
                id="group-tags"
                value={newGroup.tags.join(", ")}
                onChange={(e) => setNewGroup({ ...newGroup, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingGroup(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddGroup}>Crear Grupo</Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{group.description}</p>
              <div className="flex items-center mt-4">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">{group.members} miembros</span>
              </div>
              <div className="mt-2">
                {group.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleJoinGroup(group.id)}>
                Unirse al Grupo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

