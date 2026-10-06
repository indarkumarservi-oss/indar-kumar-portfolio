"use client"

import { useEffect, useState } from "react"

export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "")

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    const handleIntersect = (entries: IntersectionObserverEntry[], id: string) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id)
        }
      })
    }

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => handleIntersect(entries, id),
          {
            rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px`,
            threshold: 0.1,
          }
        )
        observer.observe(element)
        observers.set(id, observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds, offset])

  return activeSection
}