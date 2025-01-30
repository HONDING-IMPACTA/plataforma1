"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Header } from "@/components/header"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      // Simular envío de código de verificación
      toast({
        title: "Código de verificación enviado",
        description: "Por favor, revisa tu email para el código de verificación.",
      })
      setStep(2)
    } else {
      // Simular verificación y login
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta a NextGen.",
      })
      // Aquí iría la lógica de redirección después del login
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-md pt-20">
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa a tu cuenta de NextGen</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              {step === 1 ? (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="verificationCode">Código de Verificación</Label>
                  <Input
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button className="w-full mt-4" type="submit">
                {step === 1 ? "Siguiente" : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="/register" className="text-sm text-primary hover:underline">
              ¿No tienes cuenta? Regístrate
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

