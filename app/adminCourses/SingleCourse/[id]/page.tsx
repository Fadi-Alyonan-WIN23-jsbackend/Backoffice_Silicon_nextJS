'use client'

import { Course } from '@/app/interfaces/courseTypes'
import { fetchCourse } from './fetchCourse'
import style from './SingleCourse.module.css'

const SingleCourse = async ({ params }: { params: { id: string } }) => {
  const course: Course | null = await fetchCourse(params.id)
  if (course) {
    return (
      <div className={`singleCourseHeader ${style.singleCourseHeader}`}>
          <div className={`headerImageContainer ${style.headerImageContainer}`}>
              <div className={`imageWrapper ${style.imageWrapper}`}>
                  <img className={`headerImage ${style.headerImage}`} src={course.imageUri} alt={`Image for ${course.title}`} />
              </div>
              <div className={`imageHeaderTitleContainer ${style.imageHeaderTitleContainer}`}>
                  <h1>{course.title}</h1>
                  <p>{course.ingress}</p>
                  <div className={`courseIsBestSeller ${style.courseIsBestSeller}`}>Best Seller {course.isBestSeller}</div>
                  <div className={`courseIsDigital ${style.courseIsDigital}`}>Digital {course.isDigital}</div>                 
                  <div className={`courseStarRating ${style.courseStarRating}`}>
                      <span className={style.stars}>
                          {Array.from({ length: Math.floor(course.starRating) }, (_, i) => (
                              <span key={i} className={style.star}>&#9733;</span>
                          ))}
                          {course.starRating % 1 !== 0 && <span className={style.starHalf}>&#9733;</span>}
                      </span>
                  </div>
                  <div className={`courseReviews ${style.courseReviews}`}>{course.reviews} Reviews</div>
                  <div className={`courseLikes ${style.courseLikes}`}>{course.likes} Likes</div>
                  <div className={`courseHours ${style.courseHours}`}>{course.hours} hours</div>
                  <div className={`courseAuthor ${style.courseAuthor}`}>Created by {course.author}</div>
              </div>
          </div>
          
          <div className={`coursePage ${style.coursePage}`}>
              <div className={`courseContent ${style.courseContent}`}>
                  <div className={`courseDescription ${style.courseDescription}`}>
                      <h1>Course Description</h1>
                      <p>{course.courseContent.description}</p>
                  </div>
                  <h3 className={`whatYoullLearnTitle ${style.whatYoullLearnTitle}`}>What you'll learn</h3>
                  <div className={`whatYoullLearn ${style.whatYoullLearn}`}>
                      {course.courseContent.courseDetails.map(detail => (
                          <div key={detail.id}>
                              <div className={`whatYoullLearnPoints ${style.whatYoullLearnPoints}`}>
                                  <i className="fa-regular fa-circle-check"></i>
                                  <p>{detail.title}</p>
                              </div>
                          </div>
                      ))}
                  </div> 
                  <div className={`programDetails ${style.programDetails}`}>
                      <h1>Program Details</h1>
                      <ol>
                          {course.courseContent.courseDetails.map((detail, index) => (
                              <li key={detail.id}>
                                  <div className={`programDetailsItems ${style.programDetailsItems}`}>
                                      <h4>{detail.title}</h4>
                                      <p>{detail.description}</p>
                                  </div>
                              </li>
                          ))}
                      </ol>   
                  </div>
              </div>

              <div className={`courseIncludes ${style.courseIncludes}`}>
                <div className={`courseIncludesBoxInside ${style.courseIncludesBoxInside}`}>
                    <div className={`courseIncludesContent ${style.courseIncludesContent}`}>
                        <h4>This course includes:</h4>
                        <div>
                            {course.courseContent.includes.map((include, index) => (
                                <div className={`courseIncludesList ${style.courseIncludesList}`} key={index}>
                                    <i className="fa-regular fa-star"></i>
                                    <p>{include}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className={style.prices}>
                            {course.prices.discount ? (
                                <>
                                    <span className={style.discountedPrice}>{course.prices.discount}€</span>
                                    <span className={style.originalPrice}>{course.prices.price} €</span>
                                </>
                            ) : (
                                <span>{course.prices.price} €</span>
                            )}
                        </div>
                        <button className={`btnTheme ${style.btnTheme}`}>Join Course</button>
                    </div>
                    <div className={`extraSpace ${style.extraSpace}`}></div>
                </div>
              </div>
          </div>
      </div>
    );
  }

  
};

export default SingleCourse;
