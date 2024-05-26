"use client";

import { useEffect, useState } from "react";
import { Course } from "../interfaces/courseTypes";
import fetchCourses from "./fetchCourses";
import style from './adminCourses.module.css';
import deleteCourse from "./deleteCourses";
import Link from "next/link";

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('cant fetch courses: ', error)
      }
      setLoading(false)
    };

    fetchCourseData();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course? This can NOT be undone.');
    if (!confirmDelete) 
      return;

    try {
      await deleteCourse(id)
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('cant delete course: ', error)
    }
  }
  
  return (
    <div>
      <Link className={`createCourseLink ${style.createCourseLink}`} href='/adminCourses/createCourse'>Create new course</Link>
      <div className={`coursesTitle ${style.coursesTitle}`}>
        <h1>Courses</h1>
        <h4>Author</h4>
      </div>
      {courses.map(course => (
        <div className={`courseBox ${style.courseBox}`} key={course.id}>
          <Link className={`courseLink ${style.courseLink}`} href={`adminCourses/SingleCourse/${course.id}`}>
            <h2>{course.title}</h2>
          </Link> 
          <p>{course.author}</p>
          
          <button className={`btnDeleteCourse ${style.btnDeleteCourse}`} onClick={ () => handleDelete(course.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default AdminCourses;
