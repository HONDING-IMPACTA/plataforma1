"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(true)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isLogin ? "Ingresa tus credenciales para acceder" : "Crea una cuenta para comenzar"}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        {isLogin ? (
          <>
            ¿No tienes una cuenta?{" "}
            <Button variant="link" onClick={() => setIsLogin(false)}>
              Regístrate
            </Button>
          </>
        ) : (
          <>
            ¿Ya tienes una cuenta?{" "}
            <Button variant="link" onClick={() => setIsLogin(true)}>
              Inicia Sesión
            </Button>
          </>
        )}
      </div>
      <div className="text-center text-sm">
        <Button variant="link">¿Olvidaste tu contraseña?</Button>
      </div>
    </div>
  )
}

