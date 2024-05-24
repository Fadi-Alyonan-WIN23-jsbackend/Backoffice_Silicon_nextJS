'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './createCourse.module.css';
import { CreateCourseInput } from '@/app/interfaces/createCourseTypes';
import { createNewCourse } from './createCourse';

export default function CreateCourse() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [course, setCourse] = useState<CreateCourseInput>({
    imageUri: "",
    imageHeaderUri: "",
    title: "",
    author: "",
    categories: [],
    ingress: "",
    starRating: 0,
    reviews: "",
    likesInPercent: "",
    likes: "",
    hours: "0",
    prices: {
      price: 0,
      discount: 0,
    },
    courseContent: {
      description: "",
      includes: [],
      courseDetails: [],
    },
    isDigital: false,
    isBestSeller: false,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement
    let newValue: any

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked
    } else if (type === 'number') {
      newValue = parseFloat(value)
    } else {
      newValue = value
    }

    if (name.includes('courseDetails')) {
      const [_, index, field] = name.split('-')
      handleArrayChange(parseInt(index), field, newValue)
    } else if (name.includes('prices')) {
      const [_, field] = name.split('-')
      setCourse(prevState => ({
        ...prevState,
        prices: {
          ...prevState.prices,
          [field]: newValue
        }
      }));
    } else if (name.includes('courseContent')) {
      const [_, field] = name.split('-')
      setCourse(prevState => ({
        ...prevState,
        courseContent: {
          ...prevState.courseContent,
          [field]: newValue
        }
      }))
    } else {
      setCourse(prevState => ({
        ...prevState,
        [name]: newValue
      }))
    }
  };

  const handleArrayChange = (index: number, field: string, value: any) => {
    const updatedDetails = [...course.courseContent.courseDetails]
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    }
    setCourse(prevState => ({
      ...prevState,
      courseContent: {
        ...prevState.courseContent,
        courseDetails: updatedDetails,
      }
    }))
  }

  const addCourseDetail = () => {
    setCourse(prevState => ({
      ...prevState,
      courseContent: {
        ...prevState.courseContent,
        courseDetails: [
          ...prevState.courseContent.courseDetails,
          { id: prevState.courseContent.courseDetails.length + 1, title: '', description: '' }
        ]
      }
    }))
  }

  const validateCourse = (course: CreateCourseInput): boolean => {
    if (
      !course.imageUri ||
      !course.imageHeaderUri ||
      !course.title ||
      !course.author ||
      course.categories.length === 0 ||
      !course.ingress ||
      !course.reviews ||
      !course.likesInPercent ||
      !course.likes ||
      !course.hours ||
      !course.prices.price ||
      !course.prices.discount ||
      !course.courseContent.description ||
      course.courseContent.includes.length === 0 ||
      course.courseContent.courseDetails.length === 0
    ) {
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!validateCourse(course)) {
      setError('All fields are required.')
      setLoading(false)
      return
    }

    try {
      const result = await createNewCourse(course)

      if (result) {
        alert('Course created successfully!')
        router.push('/adminCourses')
        setCourse({
          imageUri: "",
          imageHeaderUri: "",
          title: "",
          author: "",
          categories: [],
          ingress: "",
          starRating: 0,
          reviews: "",
          likesInPercent: "",
          likes: "",
          hours: "0",
          prices: {
            price: 0,
            discount: 0,
          },
          courseContent: {
            description: "",
            includes: [],
            courseDetails: [],
          },
          isDigital: false,
          isBestSeller: false,
        })
      } else {
        setError('Could not create course. Please check your input and try again.')
      }
    } catch (error) {
      console.error(error);
      setError('Could not create course. Please try again later.')
    }

    setLoading(false)
  }

  return (
    <main>
      <div>
        <h1>Create Course</h1>
      </div>
      <div>
        <form className={`createCourseForm ${style.createCourseForm}`} onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="imageUri">Image URI</label>
            <input type="text" id="imageUri" name="imageUri" value={course.imageUri} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="imageHeaderUri">Image Header URI</label>
            <input type="text" id="imageHeaderUri" name="imageHeaderUri" value={course.imageHeaderUri} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={course.title} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={course.author} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="categories">Categories (comma separated)</label>
            <input type="text" id="categories" name="categories" value={course.categories.join(", ")} onChange={(e) => setCourse({ ...course, categories: e.target.value.split(", ").map(item => item.trim()) })} />
          </div>
          <div className="input-group">
            <label htmlFor="ingress">Ingress</label>
            <textarea id="ingress" name="ingress" value={course.ingress} onChange={onChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="starRating">Star Rating</label>
            <input type="number" step="0.1" id="starRating" name="starRating" value={course.starRating} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="reviews">Reviews</label>
            <input type="text" id="reviews" name="reviews" value={course.reviews} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="likesInPercent">Likes In Percent</label>
            <input type="text" id="likesInPercent" name="likesInPercent" value={course.likesInPercent} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="likes">Likes</label>
            <input type="text" id="likes" name="likes" value={course.likes} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="hours">Hours</label>
            <input type="text" id="hours" name="hours" value={course.hours} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="prices-price" value={course.prices.price} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="discount">Discount</label>
            <input type="number" id="discount" name="prices-discount" value={course.prices.discount} onChange={onChange} />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="courseContent-description" value={course.courseContent.description} onChange={onChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="includes">Includes (comma separated)</label>
            <input type="text" id="includes" name="courseContent-includes" value={course.courseContent.includes.join(", ")} onChange={(e) => setCourse({ ...course, courseContent: { ...course.courseContent, includes: e.target.value.split(", ").map(item => item.trim()) } })} />
          </div>
          {course.courseContent.courseDetails.map((detail, index) => (
            <div key={index} className="input-group">
              <label htmlFor={`courseDetailTitle-${index}`}>Course Detail Title</label>
              <input type="text" id={`courseDetailTitle-${index}`} name={`courseDetails-${index}-title`} value={detail.title} onChange={onChange} />
              <label htmlFor={`courseDetailDescription-${index}`}>Course Detail Description</label>
              <textarea id={`courseDetailDescription-${index}`} name={`courseDetails-${index}-description`} value={detail.description} onChange={onChange}></textarea>
            </div>
          ))}
          <button type="button" onClick={addCourseDetail}>Add Course Detail</button>
          <div className="checkbox-group">
            <label htmlFor="isDigital">Is Digital</label>
            <input type="checkbox" id="isDigital" name="isDigital" checked={course.isDigital} onChange={onChange} />
          </div>
          <div className="checkbox-group">
            <label htmlFor="isBestSeller">Is Best Seller</label>
            <input type="checkbox" id="isBestSeller" name="isBestSeller" checked={course.isBestSeller} onChange={onChange} />
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Create Course'}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  );
}
