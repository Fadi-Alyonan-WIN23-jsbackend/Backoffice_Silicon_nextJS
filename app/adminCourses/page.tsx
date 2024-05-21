"use client"

import { useEffect, useState } from "react"
import { Course } from "../interfaces/courseTypes"
import fetchCourses from "./fetchCourses"
import style from './adminCourses.module.css'

const adminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await fetchCourses()
        setCourses(data)
      }
      catch (error) {
        console.error('cant fetch courses: ', error)
      }
      setLoading(false)
    }

    fetchCourseData()
  }, [])

  if (loading) {
    return <p>Loading courses...</p>
  }

  const handleDelete = async (id: string) => {
    try {
      await fetchCourses()
      const data = await fetchCourses()
      setCourses(data)
    }
    catch (error) {
      console.error('cant delete course: ', error)
    }
  }


  return (
    <div>
      <div>
        <h1>Courses</h1>
        <a href='/adminCourses/create'>Create new course</a>
      </div>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          
          <p>{course.author}</p>
          <p>{course.categories}</p>

          <button onClick={() => handleDelete(course.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
export default adminCourses

