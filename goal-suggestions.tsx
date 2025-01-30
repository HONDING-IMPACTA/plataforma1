import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

interface Suggestion {
  id: string
  type: "short" | "medium" | "long"
  description: string
}

interface GoalSuggestionsProps {
  userProfile: {
    personalityType: string
    leadershipStyle: string
    topSkills: string[]
  }
  onAddSuggestion: (suggestion: Suggestion) => void
}

export function GoalSuggestions({ userProfile, onAddSuggestion }: GoalSuggestionsProps) {
  // Esta función simularía la generación de sugerencias basadas en el perfil del usuario
  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [
      {
        id: "1",
        type: "short",
        description: `Mejorar tus habilidades de ${userProfile.topSkills[0]} a través de un curso en línea`,
      },
      {
        id: "2",
        type: "medium",
        description: `Desarrollar tu estilo de liderazgo ${userProfile.leadershipStyle} participando en un proyecto comunitario`,
      },
      {
        id: "3",
        type: "long",
        description: `Aspirar a una posición de liderazgo que se alinee con tu personalidad ${userProfile.personalityType}`,
      },
    ]
    return suggestions
  }

  const suggestions = generateSuggestions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sugerencias de Metas</CardTitle>
        <CardDescription>Basadas en tu perfil, habilidades y estilo de liderazgo</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="flex items-center justify-between">
              <span>{suggestion.description}</span>
              <Button variant="outline" size="sm" onClick={() => onAddSuggestion(suggestion)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Agregar
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

