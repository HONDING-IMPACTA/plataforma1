import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { Notifications } from "@/components/notifications"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { Zap, Users, Leaf, RatioIcon as Balance } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b"
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen_Shot_2025-01-27_at_9.21.42_AM-removebg-preview-i7zDJbtFagBndvbmSWSuPZ4Hx6SZyF.png"
                alt="IMPACTA Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NextGen
              </span>
            </Link>
          </motion.div>

          {!isAuthPage && (
            <nav className="hidden md:flex items-center space-x-6">
              {[
                { href: "/", label: "Inicio", icon: <Zap className="h-4 w-4 mr-1" /> },
                { href: "/#questionnaire", label: "Cuestionario", icon: <Users className="h-4 w-4 mr-1" /> },
                { href: "/#results", label: "Resultados", icon: <Leaf className="h-4 w-4 mr-1" /> },
                { href: "/#chat", label: "Chat", icon: <Balance className="h-4 w-4 mr-1" /> },
                { href: "/comunidad", label: "Comunidad", icon: <Users className="h-4 w-4 mr-1" /> },
              ].map(({ href, label, icon }) => (
                <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center"
                  >
                    {icon}
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {!isAuthPage && <Notifications />}
            <LanguageSelector />
            {isAuthPage ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <Link href={pathname === "/login" ? "/register" : "/login"}>
                    {pathname === "/login" ? "Registrarse" : "Iniciar Sesión"}
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="text-primary hover:text-primary/90" asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/register">Registrarse</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

