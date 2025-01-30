"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  message: string
  read: boolean
  timestamp: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simular la obtención de notificaciones
    const mockNotifications: Notification[] = [
      { id: "1", message: "Nuevo comentario en tu proyecto", read: false, timestamp: "2m" },
      { id: "2", message: "Te han invitado a un nuevo grupo", read: false, timestamp: "1h" },
      { id: "3", message: "Tu publicación ha recibido 10 likes", read: true, timestamp: "3h" },
    ]
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs">{unreadCount}</Badge>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No tienes notificaciones</p>
          ) : (
            <>
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex justify-between items-start py-2">
                  <div>
                    <p className={`text-sm ${notification.read ? "text-gray-500" : "font-semibold"}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">{notification.timestamp}</p>
                  </div>
                  {!notification.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Marcar como leída
                    </Button>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="justify-center mt-2">
                <Button variant="link" size="sm" onClick={markAllAsRead}>
                  Marcar todas como leídas
                </Button>
              </DropdownMenuItem>
            </>
          )}
        </CardContent>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

