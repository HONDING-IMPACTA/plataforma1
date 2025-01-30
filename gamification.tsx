"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export function Gamification() {
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    // Simular la obtención de datos de gamificación
    setExperience(75)
    setAchievements([
      {
        id: "1",
        name: "Primer Proyecto",
        description: "Creaste tu primer proyecto",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        id: "2",
        name: "Colaborador Activo",
        description: "Participaste en 5 grupos",
        icon: <Star className="h-4 w-4" />,
      },
    ])
  }, [])

  const experienceToNextLevel = 100
  const progress = (experience / experienceToNextLevel) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tu Progreso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Nivel {level}</span>
          <span className="text-sm text-gray-500">
            {experience}/{experienceToNextLevel} XP
          </span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <div>
          <h4 className="font-semibold mb-2">Logros Desbloqueados</h4>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <Badge key={achievement.id} variant="secondary" className="flex items-center gap-2 p-2">
                {achievement.icon}
                <span>{achievement.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

