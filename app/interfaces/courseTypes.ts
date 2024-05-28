export interface Course {
    id: string;
    imageUri: string;
    imageHeaderUri: string;
    title: string;
    author: string;
    categories: string[];
    ingress: string;
    starRating: number;
    reviews: string;
    likesInPercent: string;
    likes: string;
    hours: number;
    prices: {
      price: number;
      discount: number;
    };
    courseContent: {
      description: string;
      includes: string[];
      courseDetails: {
        id: number;
        title: string;
        description: string;
      }[];
    };
    isDigital: boolean;
    isBestSeller: boolean;
  }