"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
  }
  summary: string
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string
    link?: string
  }>
  skills: Array<{
    id: string
    category: string
    skills: string[]
  }>
  certifications: string[]
}

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 dark:text-blue-400 mt-1">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Professional Summary</h2>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.some((exp) => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Professional Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                {(exp.company || exp.position) && (
                  <>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold">{exp.position || "Position"}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{exp.company || "Company"}</p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    {exp.description && <div className="text-sm mt-2 whitespace-pre-line">{exp.description}</div>}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.some((edu) => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                {(edu.institution || edu.degree) && (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.some((project) => project.name || project.description) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                {(project.name || project.description) && (
                  <>
                    <h3 className="font-semibold">{project.name || "Project Name"}</h3>
                    {project.description && <p className="text-sm mt-1 mb-2">{project.description}</p>}
                    {project.technologies && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                    {project.link && (
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        <strong>Link:</strong> {project.link}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
