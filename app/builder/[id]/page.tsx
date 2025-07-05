"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ArrowLeft, Download, Save, Sparkles, Plus, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResumePreview } from "@/components/resume-preview"

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link?: string
}

interface Skill {
  id: string
  category: string
  skills: string[]
}

interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  certifications: string[]
}

export default function ResumeBuilder({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    education: [
      {
        id: "1",
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ],
    experience: [
      {
        id: "1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    projects: [
      {
        id: "1",
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    skills: [
      {
        id: "1",
        category: "Technical Skills",
        skills: [],
      },
    ],
    certifications: [""],
  })

  const enhanceWithAI = async (field: string, content: string) => {
    setIsEnhancing(field)

    // Simulate AI enhancement
    setTimeout(() => {
      let enhanced = content

      if (field === "summary") {
        enhanced = `Results-driven professional with proven expertise in ${content.toLowerCase()}. Demonstrated ability to deliver high-impact solutions and drive organizational success through innovative approaches and strategic thinking.`
      } else if (field.includes("description")) {
        enhanced = `• Spearheaded ${content.toLowerCase()} initiatives, resulting in measurable improvements
• Collaborated cross-functionally to implement scalable solutions
• Optimized processes and workflows to enhance operational efficiency`
      }

      // Update the appropriate field
      if (field === "summary") {
        setResumeData((prev) => ({ ...prev, summary: enhanced }))
      } else if (field.startsWith("experience-")) {
        const expId = field.split("-")[1]
        setResumeData((prev) => ({
          ...prev,
          experience: prev.experience.map((exp) => (exp.id === expId ? { ...exp, description: enhanced } : exp)),
        }))
      }

      setIsEnhancing(null)
    }, 2000)
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }))
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const downloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download would be implemented here using Puppeteer on the backend")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Resume Builder</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={downloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                            }))
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value },
                            }))
                          }
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: e.target.value },
                            }))
                          }
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, location: e.target.value },
                            }))
                          }
                          placeholder="New York, NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                            }))
                          }
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={resumeData.personalInfo.website}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, website: e.target.value },
                            }))
                          }
                          placeholder="johndoe.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Summary */}
              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                          id="summary"
                          value={resumeData.summary}
                          onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                          placeholder="Write a brief summary of your professional background..."
                          rows={4}
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => enhanceWithAI("summary", resumeData.summary)}
                        disabled={isEnhancing === "summary" || !resumeData.summary.trim()}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isEnhancing === "summary" ? "Enhancing..." : "Enhance with AI"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience">
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <Card key={exp.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Experience {index + 1}</CardTitle>
                          {resumeData.experience.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  experience: prev.experience.filter((e) => e.id !== exp.id),
                                }))
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  experience: prev.experience.map((item) =>
                                    item.id === exp.id ? { ...item, company: e.target.value } : item,
                                  ),
                                }))
                              }
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  experience: prev.experience.map((item) =>
                                    item.id === exp.id ? { ...item, position: e.target.value } : item,
                                  ),
                                }))
                              }
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  experience: prev.experience.map((item) =>
                                    item.id === exp.id ? { ...item, startDate: e.target.value } : item,
                                  ),
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  experience: prev.experience.map((item) =>
                                    item.id === exp.id ? { ...item, endDate: e.target.value } : item,
                                  ),
                                }))
                              }
                              disabled={exp.current}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                experience: prev.experience.map((item) =>
                                  item.id === exp.id ? { ...item, description: e.target.value } : item,
                                ),
                              }))
                            }
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => enhanceWithAI(`experience-${exp.id}`, exp.description)}
                          disabled={isEnhancing === `experience-${exp.id}` || !exp.description.trim()}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          {isEnhancing === `experience-${exp.id}` ? "Enhancing..." : "Enhance with AI"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education">
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <Card key={edu.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Education {index + 1}</CardTitle>
                          {resumeData.education.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  education: prev.education.filter((e) => e.id !== edu.id),
                                }))
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  education: prev.education.map((item) =>
                                    item.id === edu.id ? { ...item, institution: e.target.value } : item,
                                  ),
                                }))
                              }
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  education: prev.education.map((item) =>
                                    item.id === edu.id ? { ...item, degree: e.target.value } : item,
                                  ),
                                }))
                              }
                              placeholder="Bachelor's, Master's, etc."
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  education: prev.education.map((item) =>
                                    item.id === edu.id ? { ...item, field: e.target.value } : item,
                                  ),
                                }))
                              }
                              placeholder="Computer Science, Business, etc."
                            />
                          </div>
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              value={edu.gpa}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  education: prev.education.map((item) =>
                                    item.id === edu.id ? { ...item, gpa: e.target.value } : item,
                                  ),
                                }))
                              }
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </TabsContent>

              {/* Projects */}
              <TabsContent value="projects">
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Project {index + 1}</CardTitle>
                          {resumeData.projects.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  projects: prev.projects.filter((p) => p.id !== project.id),
                                }))
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Project Name</Label>
                          <Input
                            value={project.name}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((item) =>
                                  item.id === project.id ? { ...item, name: e.target.value } : item,
                                ),
                              }))
                            }
                            placeholder="Project Name"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((item) =>
                                  item.id === project.id ? { ...item, description: e.target.value } : item,
                                ),
                              }))
                            }
                            placeholder="Describe your project..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Technologies Used</Label>
                          <Input
                            value={project.technologies}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((item) =>
                                  item.id === project.id ? { ...item, technologies: e.target.value } : item,
                                ),
                              }))
                            }
                            placeholder="React, Node.js, MongoDB, etc."
                          />
                        </div>
                        <div>
                          <Label>Project Link (Optional)</Label>
                          <Input
                            value={project.link}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((item) =>
                                  item.id === project.id ? { ...item, link: e.target.value } : item,
                                ),
                              }))
                            }
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Technical Skills</Label>
                      <Textarea placeholder="JavaScript, Python, React, Node.js, MongoDB, etc." rows={3} />
                    </div>
                    <div>
                      <Label>Soft Skills</Label>
                      <Textarea placeholder="Leadership, Communication, Problem Solving, etc." rows={2} />
                    </div>
                    <div>
                      <Label>Certifications</Label>
                      <Textarea placeholder="AWS Certified Developer, Google Cloud Professional, etc." rows={2} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <ResumePreview data={resumeData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
