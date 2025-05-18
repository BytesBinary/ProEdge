import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            reviews {
              id
              name
              title
              rating
              description
              image {
                id
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const fetchedReviews = result.data?.reviews?.map((item) => ({
          id: item.id,
          name: item.name,
          title: item.title,
          review: item.description,
          rating: item.rating,
          image: `${import.meta.env.VITE_SERVER_URL}/assets/${item.image.id}`,
          role: "Verified Buyer",
        })) || [];
        setReviews(fetchedReviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
            Customer Testimonials
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Voices of Satisfaction
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why thousands trust our products and services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <button className="px-6 py-3 border border-gray-300 rounded-full text-base font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300">
            Load More Reviews
          </button>
        </div> */}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="relative group h-full">
      <div className="flex flex-col h-full p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Rating */}
        <div className="flex items-center mb-5">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        {/* Review Text */}
        <blockquote className="text-gray-700 text-base italic mb-8 flex-grow relative pl-6 border-l-4 border-blue-200">
          {review.review}
        </blockquote>

        {/* Reviewer Info */}
        <div className="flex items-center">
          <div className="relative mr-4">
            <img
              className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
              src={review.image}
              alt={review.name}
            />
            <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 leading-snug">{review.name}</h4>
            <p className="text-sm text-blue-600">{review.title}</p>
            <p className="text-xs text-gray-500 mt-1">{review.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
