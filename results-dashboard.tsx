"use client"

import { useState } from "react"
import { Bar, Radar } from "react-chartjs-2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { LifeProjectPlanner } from "./life-project-planner"
import Link from "next/link"
import { Sparkles, Trophy, Star } from "lucide-react"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
)

const radarData = {
  labels: ["Extraversión", "Amabilidad", "Responsabilidad", "Neuroticismo", "Apertura"],
  datasets: [
    {
      label: "Tu perfil",
      data: [65, 59, 90, 81, 56],
      backgroundColor: "rgba(0, 128, 255, 0.2)",
      borderColor: "rgba(0, 128, 255, 1)",
      borderWidth: 1,
    },
  ],
}

const barData = {
  labels: ["Autocrático", "Democrático", "Laissez-faire", "Transformacional", "Transaccional"],
  datasets: [
    {
      label: "Estilos de liderazgo",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(0, 180, 216, 0.5)",
    },
  ],
}

const badges = [
  { name: "Comunicador Estrella", description: "Excelente habilidad de comunicación" },
  { name: "Maestro de la Empatía", description: "Gran capacidad para entender a los demás" },
  { name: "Líder Visionario", description: "Habilidad para inspirar y guiar" },
  { name: "Solucionador Creativo", description: "Enfoque innovador para resolver problemas" },
  { name: "Motivador Nato", description: "Capacidad para impulsar a otros" },
]

const personalityDescriptions = {
  Extraversión:
    "Tu nivel de extraversión indica que te sientes cómodo en situaciones sociales y disfrutas interactuando con otros. Esto puede ser una gran ventaja en roles de liderazgo que requieren networking y construcción de relaciones.",
  Amabilidad:
    "Tu puntuación en amabilidad sugiere que eres considerado y cooperativo. Esto puede ayudarte a crear un ambiente de trabajo positivo y fomentar la colaboración en tu equipo.",
  Responsabilidad:
    "Tu alto nivel de responsabilidad indica que eres organizado y confiable. Esta cualidad es crucial para un líder, ya que inspira confianza en tu equipo y asegura que los proyectos se completen a tiempo.",
  Neuroticismo:
    "Tu puntuación en neuroticismo sugiere que manejas bien el estrés y mantienes la calma bajo presión. Esta estabilidad emocional es valiosa en situaciones de liderazgo desafiantes.",
  Apertura:
    "Tu nivel de apertura indica que eres curioso y receptivo a nuevas ideas. Esta cualidad puede ayudarte a innovar y adaptarte a los cambios en tu rol de liderazgo.",
}

const leadershipStyleDescriptions = {
  Autocrático:
    "Este estilo implica tomar decisiones sin mucha participación del equipo. Puede ser efectivo en situaciones de crisis, pero puede limitar la creatividad y la motivación del equipo a largo plazo.",
  Democrático:
    "Este estilo fomenta la participación del equipo en la toma de decisiones. Puede aumentar la satisfacción y el compromiso del equipo, pero puede ralentizar el proceso de toma de decisiones.",
  "Laissez-faire":
    "Este estilo ofrece mucha autonomía al equipo. Puede ser efectivo con equipos altamente calificados y motivados, pero puede llevar a la falta de dirección en equipos menos experimentados.",
  Transformacional:
    "Este estilo se centra en inspirar y motivar al equipo hacia una visión compartida. Es efectivo para impulsar el cambio y el crecimiento en una organización.",
  Transaccional:
    "Este estilo se basa en recompensas y castigos claros. Puede ser efectivo para lograr objetivos a corto plazo, pero puede limitar la innovación y el crecimiento a largo plazo.",
}

export function ResultsDashboard() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [showBadgeDetails, setShowBadgeDetails] = useState<string | null>(null)

  const overallProgress = 65 // This would be calculated based on the user's actual progress

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500"
      >
        Tu Viaje de Liderazgo
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white overflow-hidden">
          <CardContent className="pt-6 relative">
            <div className="flex justify-between items-center mb-4 z-10 relative">
              <h3 className="text-2xl font-bold">Nivel {currentLevel}</h3>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {overallProgress} XP
              </Badge>
            </div>
            <Progress value={overallProgress} className="h-4 mb-2" />
            <p className="text-sm text-right">{overallProgress}/100 XP para el siguiente nivel</p>
            <Sparkles className="absolute right-4 bottom-4 h-16 w-16 text-white opacity-10" />
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {["perfil", "estilos", "habilidades", "logros", "proyecto-vida"].map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab === "proyecto-vida" ? "Plan de Vida" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <AnimatePresence mode="wait">
          {["perfil", "estilos", "habilidades", "logros", "proyecto-vida"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {/* Content for each tab */}
              {tab === "perfil" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Perfil de Personalidad (Big Five)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Radar data={radarData} />
                      <div className="mt-4 space-y-2">
                        {Object.entries(personalityDescriptions).map(([trait, description], index) => (
                          <motion.div
                            key={`personality-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="font-semibold">{trait}</h4>
                            <p className="text-sm text-gray-600">{description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              {tab === "estilos" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Estilos de Liderazgo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Bar data={barData} />
                    <div className="mt-4 space-y-2">
                      {Object.entries(leadershipStyleDescriptions).map(([style, description], index) => (
                        <motion.div
                          key={`leadership-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="font-semibold">{style}</h4>
                          <p className="text-sm text-gray-600">{description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              {tab === "habilidades" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Habilidades y Fortalezas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Progress value={80} className="w-full mr-4" />
                        <span>Comunicación</span>
                      </li>
                      <li className="flex items-center">
                        <Progress value={70} className="w-full mr-4" />
                        <span>Empatía</span>
                      </li>
                      <li className="flex items-center">
                        <Progress value={90} className="w-full mr-4" />
                        <span>Trabajo en equipo</span>
                      </li>
                      <li className="flex items-center">
                        <Progress value={60} className="w-full mr-4" />
                        <span>Resolución de problemas</span>
                      </li>
                      <li className="flex items-center">
                        <Progress value={75} className="w-full mr-4" />
                        <span>Adaptabilidad</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Valores Principales</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Integridad</li>
                        <li>Innovación</li>
                        <li>Colaboración</li>
                        <li>Excelencia</li>
                        <li>Responsabilidad social</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
              {tab === "logros" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Insignias y Logros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {badges.map((badge) => (
                        <Button
                          key={badge.name}
                          variant="outline"
                          className="h-auto text-left flex flex-col items-start p-4"
                          onClick={() => setShowBadgeDetails(badge.name)}
                        >
                          <span className="text-lg font-semibold mb-2">{badge.name}</span>
                          <span className="text-sm text-gray-500">{badge.description}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              {tab === "proyecto-vida" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Plan de Vida</CardTitle>
                    <CardDescription>
                      Basado en tus habilidades, estilo de liderazgo y perfil, planifica tus metas y objetivos para el
                      futuro.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LifeProjectPlanner />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>

      <AnimatePresence>
        {showBadgeDetails && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBadgeDetails(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
                {showBadgeDetails}
              </h3>
              <p className="mb-4">{badges.find((b) => b.name === showBadgeDetails)?.description}</p>
              <p className="mb-4">
                ¡Felicidades por obtener esta insignia! Sigue desarrollando tus habilidades de liderazgo para
                desbloquear más logros.
              </p>
              <Button onClick={() => setShowBadgeDetails(null)}>Cerrar</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-center mt-8">
        <Link href="/">
          <Button variant="outline">Volver al Inicio</Button>
        </Link>
      </div>
    </div>
  )
}

