'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './createCourse.module.css';
import { CreateCourseInput } from '@/app/interfaces/createCourseTypes';
import { createNewCourse } from './createCourse';

export default function CreateCourse() {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value

      setCourse(prevState => ({
        ...prevState,
        [name]: newValue
      }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      setError('')

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
          });
        } else {
          setError('Could not create course. Please check your input and try again.')
        }
      } catch (error) {
        console.error(error)
        setError('Could not create course. Please try again later.')
      }

      setLoading(false)
    };

    return (
      <main>
        <div>
          <h1>Create Course</h1>
        </div>
        <div>
          <form className={`createCourseForm ${style.createCourseForm}`} onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={course.title} onChange={onChange} className={error ? 'error' : ''} />
            </div>
            <div className="input-group">
              <label htmlFor="hours">Hours</label>
              <input type="text" id="hours" name="hours" value={course.hours} onChange={onChange} className={error ? 'error' : ''} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="isDigital">Is Digital</label>
              <input type="checkbox" id="isDigital" name="isDigital" checked={course.isDigital} onChange={onChange} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="isBestSeller">Is Best Seller</label>
              <input type="checkbox" id="isBestSeller" name="isBestSeller" checked={course.isBestSeller} onChange={onChange} />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Create Course'}</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </main>
    );
}
