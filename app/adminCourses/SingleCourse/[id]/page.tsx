import { Course } from '@/app/interfaces/courseTypes';
import { fetchCourse } from './fetchCourse';

const SingleCourse = async ({ params }: { params: { id: string } }) => {
  const course: Course | null = await fetchCourse(params.id);
  if (course) {
    return (
      <div>
        <h1>{course.title}</h1>
        <img src={course.imageUri} alt={course.title} />
        <p>{course.author}</p>
        <p>{course.ingress}</p>
        <p>{course.starRating} stars</p>
        <div>
          <h2>Course Content</h2>
          {course.courseContent.courseDetails.map((detail) => (
            <div key={detail.id}>
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
};

export default SingleCourse;
