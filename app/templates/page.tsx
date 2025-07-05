"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface Template {
  id: string
  name: string
  description: string
  preview: string
  category: string
  popular?: boolean
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, modern design perfect for tech and creative roles",
    preview: "/placeholder.svg?height=400&width=300",
    category: "Modern",
    popular: true,
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional format ideal for corporate and executive positions",
    preview: "/placeholder.svg?height=400&width=300",
    category: "Traditional",
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold and creative layout for designers and artists",
    preview: "/placeholder.svg?height=400&width=300",
    category: "Creative",
    popular: true,
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple, clean design that focuses on content",
    preview: "/placeholder.svg?height=400&width=300",
    category: "Minimal",
  },
  {
    id: "academic",
    name: "Academic Scholar",
    description: "Perfect for academic and research positions",
    preview: "/placeholder.svg?height=400&width=300",
    category: "Academic",
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Store selected template and redirect to builder
    localStorage.setItem("selectedTemplate", templateId)
    router.push("/builder/new")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">ResumeAI</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Template</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select from our professionally designed templates. Each template is ATS-friendly and optimized for modern
            hiring practices.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {template.popular && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                  Popular
                </div>
              )}

              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                    <div className="bg-blue-600 text-white rounded-full p-2">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                      {template.category}
                    </CardDescription>
                  </div>
                </div>
                <CardDescription className="text-sm">{template.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectTemplate(template.id)
                  }}
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                >
                  {selectedTemplate === template.id ? "Selected" : "Use This Template"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedTemplate && (
          <div className="fixed bottom-8 right-8">
            <Button size="lg" onClick={() => handleSelectTemplate(selectedTemplate)} className="shadow-lg">
              Continue with Selected Template
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
