"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

type Language = "es-CO" | "es-ES" | "en-US" | "en-GB"

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es-CO")

  const languages = {
    "es-CO": { name: "Español (Colombia)", flag: "🇨🇴" },
    "es-ES": { name: "Español (España)", flag: "🇪🇸" },
    "en-US": { name: "English (US)", flag: "🇺🇸" },
    "en-GB": { name: "English (UK)", flag: "🇬🇧" },
  }

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang)
    // Aquí iría la lógica para cambiar el idioma en toda la aplicación
    // Por ejemplo, usando i18n o un contexto de React
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-[200px] justify-start">
          <span className="mr-2 text-lg">{languages[currentLanguage].flag}</span>
          {languages[currentLanguage].name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(languages) as Language[]).map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
            <span className="mr-2 text-lg">{languages[lang].flag}</span>
            {languages[lang].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

