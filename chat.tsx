"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, RotateCcw, Copy, Check, MessageSquare, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  status: "sending" | "sent" | "error"
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  lastUpdated: Date
}

export function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const savedConversations = localStorage.getItem("chatConversations")
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations)
      setConversations(
        parsed.map((conv: any) => ({
          ...conv,
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          lastUpdated: new Date(conv.lastUpdated),
        })),
      )
    }
  }, [])

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("chatConversations", JSON.stringify(conversations))
    }
  }, [conversations])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef, currentConversation]) // Added currentConversation dependency

  const simulateTypingResponse = async (content: string) => {
    return new Promise<void>((resolve) => {
      const words = content.split(" ")
      let currentText = ""
      let wordIndex = 0

      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += words[wordIndex] + " "
          setCurrentConversation((prev) =>
            prev
              ? {
                  ...prev,
                  messages: prev.messages.map((msg) =>
                    msg.id === "typing" ? { ...msg, content: currentText.trim() } : msg,
                  ),
                }
              : null,
          )
          wordIndex++
        } else {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })
  }

  const handleSend = async () => {
    if (!input.trim() || !currentConversation) return

    const userMessageId = `user-${Date.now()}`
    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: input,
      timestamp: new Date(),
      status: "sent",
    }

    setCurrentConversation({
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      lastUpdated: new Date(),
    })
    setInput("")
    setIsTyping(true)

    // Agregar mensaje temporal del asistente
    const typingMessageId = "typing"
    const typingMessage: Message = {
      id: typingMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      status: "sending",
    }

    setCurrentConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, typingMessage],
            lastUpdated: new Date(),
          }
        : null,
    )

    // Simular respuesta del asistente
    const response =
      "Gracias por tu mensaje. Como tu asistente de liderazgo, estoy aquí para ayudarte a desarrollar tus habilidades. ¿Te gustaría que exploremos algún tema específico de liderazgo o que analicemos tus fortalezas actuales?"

    await simulateTypingResponse(response)

    setCurrentConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: prev.messages
              .filter((msg) => msg.id !== "typing")
              .concat({
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: response,
                timestamp: new Date(),
                status: "sent",
              }),
            lastUpdated: new Date(),
          }
        : null,
    )

    setIsTyping(false)
  }

  const handleCopy = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(messageId)
    setTimeout(() => setCopiedId(null), 2000)
    toast({
      description: "Mensaje copiado al portapapeles",
    })
  }

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Conversación ${conversations.length + 1}`,
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content: "¡Hola! Soy tu asistente de NextGen. ¿En qué puedo ayudarte hoy con tu desarrollo de liderazgo?",
          timestamp: new Date(),
          status: "sent",
        },
      ],
      lastUpdated: new Date(),
    }
    setConversations([...conversations, newConversation])
    setCurrentConversation(newConversation)
  }

  const selectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation)
  }

  const updateConversation = (conversation: Conversation) => {
    setConversations((prev) => prev.map((conv) => (conv.id === conversation.id ? conversation : conv)))
    setCurrentConversation(conversation)
  }

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id))
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
    }
  }

  const editConversationTitle = (id: string, newTitle: string) => {
    const conversation = conversations.find((conv) => conv.id === id)
    if (conversation) {
      const updated = {
        ...conversation,
        title: newTitle,
        lastUpdated: new Date(),
      }
      updateConversation(updated)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-0">
        <div className="flex h-[calc(100vh-160px)] w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-background border shadow-lg">
          <div className="w-1/4 border-r border-border">
            <div className="p-4">
              <Button onClick={startNewConversation} className="w-full">
                Nueva Conversación
              </Button>
            </div>
            <ScrollArea className="h-[calc(100%-60px)]">
              {conversations
                .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
                .map((conv) => (
                  <div
                    key={conv.id}
                    className={`group relative flex items-center p-2 hover:bg-accent ${
                      currentConversation?.id === conv.id ? "bg-accent" : ""
                    }`}
                  >
                    <Button variant="ghost" className="flex-1 justify-start" onClick={() => selectConversation(conv)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate">{conv.title}</span>
                    </Button>
                    <div className="absolute right-2 hidden group-hover:flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar título</DialogTitle>
                            <DialogDescription>Cambia el título de esta conversación</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="title">Título</Label>
                              <Input
                                id="title"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                              />
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              editConversationTitle(conv.id, editingTitle)
                              setEditingTitle("")
                            }}
                          >
                            Guardar
                          </Button>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteConversation(conv.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="bg-primary-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen_Shot_2025-01-27_at_9.21.42_AM-removebg-preview-i7zDJbtFagBndvbmSWSuPZ4Hx6SZyF.png"
                  alt="IMPACTA Logo"
                  width={24}
                  height={24}
                  className="h-6 w-auto"
                />
                <h3 className="text-lg font-semibold">Asistente NextGen</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-primary-600"
                onClick={startNewConversation}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-6">
                {currentConversation?.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex ${
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      } items-start max-w-[80%] group`}
                    >
                      <Avatar className="w-8 h-8 mx-2">
                        <AvatarImage
                          src={
                            message.role === "user"
                              ? "/user-avatar.png"
                              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen_Shot_2025-01-27_at_9.21.42_AM-removebg-preview-i7zDJbtFagBndvbmSWSuPZ4Hx6SZyF.png"
                          }
                        />
                        <AvatarFallback>{message.role === "user" ? "U" : "A"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`px-4 py-2 rounded-lg relative ${
                          message.role === "user" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <ReactMarkdown className="prose prose-sm max-w-none">{message.content}</ReactMarkdown>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopy(message.content, message.id)}
                          >
                            {copiedId === message.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-4 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="border-t p-4 flex justify-center">
              <Link href="/">
                <Button variant="outline">Volver al Inicio</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

