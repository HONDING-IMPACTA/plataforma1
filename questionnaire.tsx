"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  "Personalidad",
  "Intereses",
  "Aprendizaje",
  "Propósito",
  "Inteligencia Emocional",
  "Motivación",
  "Fortalezas",
]

const questions = [
  // Personalidad
  "¿Prefieres trabajar en equipo o en solitario?",
  "¿Planificas tus actividades con anticipación?",
  "¿Te adaptas fácilmente a los cambios?",
  "¿Cómo reaccionas ante los conflictos?",
  "¿Eres curioso por aprender cosas nuevas?",
  "¿Te recuperas rápido de situaciones difíciles?",
  "¿Prefieres actividades estructuradas o improvisadas?",

  // Intereses
  "¿Te gusta crear cosas con tus manos?",
  "¿Disfrutas investigar temas científicos?",
  "¿Te motiva ayudar a otras personas?",
  "¿Te atrae liderar proyectos o grupos?",
  "¿Prefieres tareas que requieren atención al detalle?",
  "¿Te gustaría trabajar al aire libre?",
  "¿Te entusiasma participar en actividades creativas?",

  // Aprendizaje
  "¿Aprendes mejor observando antes de actuar?",
  "¿Prefieres experimentar directamente?",
  "¿Te gusta reflexionar antes de decidir?",
  "¿Aprendes mejor con gráficos y diagramas?",
  "¿Prefieres instrucciones claras o experimentar?",
  "¿Aprendes mejor discutiendo ideas con otros?",
  "¿Te gustan las actividades que combinan movimiento y aprendizaje?",

  // Propósito
  "¿Tienes claras tus metas a 5 años?",
  "¿Es importante para ti contribuir al bienestar de otros?",
  "¿Te motivan tus objetivos personales?",
  "¿Qué haces cuando no estás seguro de tu camino?",
  "¿Tus actividades diarias te acercan a tus metas?",
  "¿Tienes un modelo a seguir que te inspire?",
  "¿Estás satisfecho con tus decisiones hasta ahora?",

  // Inteligencia Emocional
  "¿Reconoces fácilmente tus emociones?",
  "¿Controlas tus emociones en momentos de estrés?",
  "¿Te sientes cómodo expresando tus opiniones?",
  "¿Entiendes cómo se sienten los demás?",
  "¿Buscas soluciones prácticas a problemas emocionales?",
  "¿Eres optimista frente a los retos?",
  "¿Mantienes la calma en situaciones difíciles?",

  // Motivación
  "¿Te esfuerzas por superar las expectativas?",
  "¿Te motiva obtener resultados excelentes?",
  "¿Cómo manejas las dificultades en tus metas?",
  "¿Prefieres tareas desafiantes o fáciles?",
  "¿Te satisface lograr objetivos difíciles?",
  "¿Cómo te mantienes motivado en tareas largas?",
  "¿Cómo celebras tus logros?",

  // Fortalezas
  "¿Eres creativo al resolver problemas?",
  "¿Qué tan importante es la honestidad para ti?",
  "¿Eres amable incluso en días difíciles?",
  "¿Puedes perdonar a quienes te han lastimado?",
  "¿Mantienes una perspectiva positiva ante los desafíos?",
  "¿Prefieres proyectos que beneficien a tu comunidad?",
  "¿Aprendes de tus errores?",
]

export function Questionnaire() {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [progress, setProgress] = useState(0)

  const handleAnswer = (question: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [question]: value }))
    setProgress((Object.keys(answers).length / questions.length) * 100)
  }

  const questionsPerCategory = questions.length / categories.length
  const startIndex = currentCategory * questionsPerCategory
  const endIndex = startIndex + questionsPerCategory

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center mb-4">Cuestionario de Liderazgo</CardTitle>
        <CardDescription className="text-center">
          Responde a las siguientes preguntas para descubrir tu potencial de liderazgo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full h-4 rounded-full mb-8" />
        <Tabs
          value={categories[currentCategory]}
          onValueChange={(value) => setCurrentCategory(categories.indexOf(value))}
        >
          <TabsList className="flex justify-between mb-8 overflow-x-auto">
            {categories.map((category, index) => (
              <TabsTrigger
                key={`category-${index}`}
                value={category}
                disabled={index > currentCategory}
                className="px-2 py-1 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            {categories.map((category, categoryIndex) => (
              <TabsContent key={`content-${categoryIndex}`} value={category}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {questions.slice(startIndex, endIndex).map((question, questionIndex) => (
                    <motion.div
                      key={question}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: questionIndex * 0.1 }}
                      className="space-y-4"
                    >
                      <Label className="text-lg font-medium">{question}</Label>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm whitespace-nowrap">Totalmente en desacuerdo</span>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[answers[`${category}-${questionIndex}`] || 3]}
                          onValueChange={(value) => handleAnswer(`${category}-${questionIndex}`, value[0])}
                          className="flex-grow"
                        />
                        <span className="text-sm whitespace-nowrap">Totalmente de acuerdo</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setCurrentCategory((prev) => Math.max(0, prev - 1))} disabled={currentCategory === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <Link href="/">
            <Button variant="outline">Volver al Inicio</Button>
          </Link>
          <Button
            onClick={() => setCurrentCategory((prev) => Math.min(categories.length - 1, prev + 1))}
            disabled={currentCategory === categories.length - 1}
          >
            Siguiente <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

