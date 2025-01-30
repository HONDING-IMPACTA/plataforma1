"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Repeat2, Leaf, RatioIcon as Balance, Zap, Users } from "lucide-react"
import { motion } from "framer-motion"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  tags: string[]
}

const initialPosts: Post[] = [
  {
    id: "1",
    author: { name: "Ana García", avatar: "/avatars/ana.jpg" },
    content:
      "¡Acabo de terminar mi proyecto de liderazgo comunitario! Fue una experiencia increíble trabajar con el centro juvenil local. #LiderazgoJoven #ImpactoComunitario",
    likes: 15,
    comments: 3,
    shares: 2,
    timestamp: "2h",
    tags: ["innovación", "desarrollo"],
  },
  {
    id: "2",
    author: { name: "Carlos Mendoza", avatar: "/avatars/carlos.jpg" },
    content:
      "Buscando compañeros para un proyecto de innovación social. ¿Alguien interesado en crear una app para conectar voluntarios con organizaciones locales? #ProyectoSocial #Tecnología",
    likes: 8,
    comments: 5,
    shares: 1,
    timestamp: "4h",
    tags: ["agilidad", "gobernanza"],
  },
]

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const [userAvatar, setUserAvatar] = useState("/avatars/default.jpg")

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: { name: "Tú", avatar: userAvatar },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "Ahora",
        tags: ["innovación"],
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setUserAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "innovación":
        return <Zap className="h-4 w-4" />
      case "desarrollo":
        return <Users className="h-4 w-4" />
      case "agilidad":
        return <Zap className="h-4 w-4" />
      case "gobernanza":
        return <Balance className="h-4 w-4" />
      case "naturaleza":
        return <Leaf className="h-4 w-4" />
      case "justicia":
        return <Balance className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar onImageChange={handleAvatarChange}>
              <AvatarImage src={userAvatar} alt="Tu avatar" />
              <AvatarFallback>TÚ</AvatarFallback>
            </Avatar>
            <Textarea placeholder="¿Qué estás pensando?" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Añadir imagen</Button>
          <Button onClick={handlePostSubmit}>Publicar</Button>
        </CardFooter>
      </Card>

      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {getTagIcon(tag)}
                    <span className="ml-1">{tag}</span>
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                <Heart className="mr-2 h-4 w-4" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Repeat2 className="mr-2 h-4 w-4" /> {post.shares}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

