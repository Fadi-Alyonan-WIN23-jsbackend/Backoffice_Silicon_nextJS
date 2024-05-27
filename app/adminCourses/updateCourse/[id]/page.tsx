'use client'

import { Course } from "@/app/interfaces/courseTypes"
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { fetchCourse } from "../../SingleCourse/[id]/fetchCourse"
import updateCourse from "./updateCourse"
import style from './updateCourse.module.css'

const UpdateCoursePage = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [formState, setFormState] = useState<Partial<Course>>({})
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    const loadCourse = async () => {
      const response = await fetchCourse(Array.isArray(id) ? id[0] : id)
      if (response) {
        setCourse(response)
        setFormState(response)
      }
      setLoading(false)
    }
    loadCourse()
  }, [id])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let newValue: any

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked
    } else if (type === 'number') {
      newValue = parseFloat(value)
    } else {
      newValue = value
    }

    setFormState(prevState => ({ ...prevState, [name]: newValue }))
  }

  const handleAddCourseDetail = () => {
    setFormState(prevState => {
        const updatedCourseDetails = [
            ...(prevState.courseContent?.courseDetails || []),
            { id: (prevState.courseContent?.courseDetails?.length || 0) + 1, title: '', description: '' }
        ]

        return {
            ...prevState,
            courseContent: {
                ...prevState.courseContent,
                courseDetails: updatedCourseDetails,
                description: prevState.courseContent?.description || '', 
                includes: prevState.courseContent?.includes || [] 
            }
        }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateCourse({ ...formState, id: Array.isArray(id) ? id[0] : id })
      alert('Course updated successfully!')
      router.push('/adminCourses')
    } catch (error) {
      console.error('Failed to update course:', error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!course) {
    return <p>Course not found</p>
  }

  return (
    <div>
      <h1>Update Course</h1>
      <form className={`updateCourseForm ${style.updateCourseForm}`} onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <label htmlFor="imageUri">Image URI</label>
          <input type="text" id="imageUri" name="imageUri" value={formState.imageUri || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="imageHeaderUri">Image Header URI</label>
          <input type="text" id="imageHeaderUri" name="imageHeaderUri" value={formState.imageHeaderUri || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formState.title || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" value={formState.author || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="categories">Categories (comma separated)</label>
          <input type="text" id="categories" name="categories" value={formState.categories?.join(", ") || ''} onChange={(e) => setFormState({ ...formState, categories: e.target.value.split(", ").map(item => item.trim()) })} />
        </div>
        <div className="input-group">
          <label htmlFor="ingress">Ingress</label>
          <textarea id="ingress" name="ingress" value={formState.ingress || ''} onChange={onChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="starRating">Star Rating</label>
          <input type="number" step="0.1" id="starRating" name="starRating" value={formState.starRating || 0} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="reviews">Reviews</label>
          <input type="text" id="reviews" name="reviews" value={formState.reviews || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="likesInPercent">Likes In Percent</label>
          <input type="text" id="likesInPercent" name="likesInPercent" value={formState.likesInPercent || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="likes">Likes</label>
          <input type="text" id="likes" name="likes" value={formState.likes || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="hours">Hours</label>
          <input type="text" id="hours" name="hours" value={formState.hours || ''} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="prices-price" value={formState.prices?.price || 0} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="discount">Discount</label>
          <input type="number" id="discount" name="prices-discount" value={formState.prices?.discount || 0} onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="courseContent-description" value={formState.courseContent?.description || ''} onChange={onChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="includes">Includes (comma separated)</label>
          <input type="text" id="includes" name="courseContent-includes" value={formState.courseContent?.includes?.join(", ") || ''} onChange={(e) => setFormState({ ...formState, courseContent: { ...formState.courseContent, includes: e.target.value.split(", ").map(item => item.trim()), description: formState.courseContent?.description || '', courseDetails: formState.courseContent?.courseDetails || [] } })} />
        </div>
        {formState.courseContent?.courseDetails?.map((detail, index) => (
          <div key={index} className="input-group">
            <label htmlFor={`courseDetailTitle-${index}`}>Course Detail Title</label>
            <input type="text" id={`courseDetailTitle-${index}`} name={`courseDetails-${index}-title`} value={detail.title} onChange={onChange} />
            <label htmlFor={`courseDetailDescription-${index}`}>Course Detail Description</label>
            <textarea id={`courseDetailDescription-${index}`} name={`courseDetails-${index}-description`} value={detail.description} onChange={onChange}></textarea>
          </div>
        ))}
        <button type="button" onClick={handleAddCourseDetail}>Add Course Detail</button>
        <div className="checkbox-group">
          <label htmlFor="isDigital">Is Digital</label>
          <input type="checkbox" id="isDigital" name="isDigital" checked={formState.isDigital || false} onChange={onChange} />
        </div>
        <div className="checkbox-group">
          <label htmlFor="isBestSeller">Is Best Seller</label>
          <input type="checkbox" id="isBestSeller" name="isBestSeller" checked={formState.isBestSeller || false} onChange={onChange} />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Update Course'}</button>
      </form>
    </div>
  )
}

export default UpdateCoursePage
