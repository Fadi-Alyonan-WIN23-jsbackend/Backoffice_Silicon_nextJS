'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import style from './createCourse.module.css'
import { CreateCourseInput } from '@/app/interfaces/createCourseTypes'
import { createNewCourse } from './createCourse'

export default function CreateCourse() {
  const router = useRouter();
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageHeaderFile, setImageHeaderFile] = useState<File | null>(null)
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
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement
    let newValue: any

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked
    } else if (type === 'number') {
      newValue = name === 'prices-discount' && value === '' ? null : parseFloat(value)
    } else {
      newValue = value
    }

    if (name.includes('courseDetails')) {
      const [_, field, index] = name.split('-');
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
      }));
    } else {
      setCourse(prevState => ({
        ...prevState,
        [name]: newValue
      }));
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

  const validateCourse = (course: CreateCourseInput, imageFile: File | null, imageHeaderFile: File | null): boolean => {
    if (
      !imageFile ||
      !imageHeaderFile ||
      !course.title ||
      !course.author ||
      course.categories.length === 0 ||
      !course.ingress ||
      !course.reviews ||
      !course.likesInPercent ||
      !course.likes ||
      !course.hours ||
      !course.prices.price ||
      !course.courseContent.description ||
      course.courseContent.includes.length === 0 ||
      course.courseContent.courseDetails.length === 0
    ) {
      return false;
    }
    return true;
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('https://fileprovider-siliconas-sebwir.azurewebsites.net/api/Upload?code=q_vR_JaeYVAiIsY1UXa3At4Z0AC0WqiXLu_jlaOwtIOxAzFutihjvw%3D%3D&containerName=profileimages', {
      method: 'POST',
      body: formData
    })

    if (res.status === 200) {
      const result = await res.json()
      return result.filePath
    } else {
      throw new Error('Failed to upload file')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!validateCourse(course, imageFile, imageHeaderFile)) {
      setError('All fields are required.')
      setLoading(false)
      return
    }

    try {
      const imageUri = imageFile ? await uploadFile(imageFile) : ''
      const imageHeaderUri = imageHeaderFile ? await uploadFile(imageHeaderFile) : ''

      const result = await createNewCourse({
        ...course,
        imageUri,
        imageHeaderUri,
      })

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
        setImageFile(null)
        setImageHeaderFile(null)
      } else {
        setError('Could not create course. Please check your input and try again.')
      }
    } catch (error) {
      console.error(error)
      setError('Could not create course. Please try again later.')
    }

    setLoading(false)
  }

  return (
    <div className={style.main}>
      <div className={style.header}>
        <h1>Create Course</h1>
      </div>
      <div className={style.formContainer}>
        <form className={`createCourseForm ${style.createCourseForm}`} onSubmit={handleSubmit} noValidate>
          <div className={style.inputGroup}>
            <label htmlFor="imageUri">Image URI</label>
            <input type="file" id="imageUri" name="imageUri" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="imageHeaderUri">Image Header URI</label>
            <input type="file" id="imageHeaderUri" name="imageHeaderUri" accept="image/*" onChange={(e) => setImageHeaderFile(e.target.files?.[0] || null)} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={course.title} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={course.author} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="categories">Categories (comma separated)</label>
            <input type="text" id="categories" name="categories" value={course.categories.join(", ")} onChange={(e) => setCourse({ ...course, categories: e.target.value.split(", ").map(item => item.trim()) })} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="ingress">Ingress</label>
            <textarea id="ingress" name="ingress" value={course.ingress} onChange={onChange}></textarea>
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="starRating">Star Rating</label>
            <input type="number" step="0.1" id="starRating" name="starRating" value={course.starRating} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="reviews">Reviews</label>
            <input type="text" id="reviews" name="reviews" value={course.reviews} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="likesInPercent">Likes in Percent</label>
            <input type="text" id="likesInPercent" name="likesInPercent" value={course.likesInPercent} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="likes">Likes</label>
            <input type="text" id="likes" name="likes" value={course.likes} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="hours">Hours</label>
            <input type="text" id="hours" name="hours" value={course.hours} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="prices-price">Price</label>
            <input type="number" step="0.01" id="prices-price" name="prices-price" value={course.prices.price} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="prices-discount">Discount</label>
            <input type="number" step="0.01" id="prices-discount" name="prices-discount" value={course.prices.discount || ''} onChange={onChange} />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="courseContent-description">Course Description</label>
            <textarea id="courseContent-description" name="courseContent-description" value={course.courseContent.description} onChange={onChange}></textarea>
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="courseContent-includes">Course Includes (comma separated)</label>
            <input type="text" id="courseContent-includes" name="courseContent-includes" value={course.courseContent.includes.join(", ")} onChange={(e) => setCourse({ ...course, courseContent: { ...course.courseContent, includes: e.target.value.split(", ").map(item => item.trim()) } })} />
          </div>
          <div className={style.courseDetails}>
            <h2>Course Details</h2>
            {course.courseContent.courseDetails.map((detail, index) => (
              <div key={index} className={style.inputGroup}>
                <label htmlFor={`courseDetails-title-${index}`}>Title</label>
                <input type="text" id={`courseDetails-title-${index}`} name={`courseDetails-title-${index}`} value={detail.title} onChange={onChange} />
                <label htmlFor={`courseDetails-description-${index}`}>Description</label>
                <textarea id={`courseDetails-description-${index}`} name={`courseDetails-description-${index}`} value={detail.description} onChange={onChange}></textarea>
              </div>
            ))}
            <button type="button" className={style.addButton} onClick={addCourseDetail}>Add Course Detail</button>
          </div>
          <div className={style.checkboxGroup}>
            <label htmlFor="isDigital">Is Digital</label>
            <input type="checkbox" id="isDigital" name="isDigital" checked={course.isDigital} onChange={onChange} />
          </div>
          <div className={style.checkboxGroup}>
            <label htmlFor="isBestSeller">Is Best Seller</label>
            <input type="checkbox" id="isBestSeller" name="isBestSeller" checked={course.isBestSeller} onChange={onChange} />
          </div>
          {error && <div className={style.error}>{error}</div>}
          <button className={style.submitButton} type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  )
}
