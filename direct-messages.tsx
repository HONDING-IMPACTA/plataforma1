"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
}

export function DirectMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Simular la obtención de mensajes
    setMessages([
      { id: "1", sender: "Ana", content: "Hola, ¿cómo va tu proyecto?", timestamp: "10:30" },
      { id: "2", sender: "Tú", content: "¡Hola Ana! Va muy bien, gracias por preguntar.", timestamp: "10:32" },
    ])
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "Tú",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Mensajes Directos</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start mb-4 ${message.sender === "Tú" ? "justify-end" : ""}`}>
              {message.sender !== "Tú" && (
                <Avatar className="mr-2">
                  <AvatarImage src={`/avatars/${message.sender.toLowerCase()}.jpg`} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-2 max-w-[70%] ${message.sender === "Tú" ? "bg-primary-100" : "bg-gray-100"}`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-grow"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

