import React, { useState } from 'react';
import { Star, ArrowLeft, ThumbsUp, MessageSquare } from 'lucide-react';

const ReviewSystem = ({ onBack }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const recentReviews = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent plumbing service! Very professional and arrived on time. Fixed the issue quickly and cleaned up afterwards.",
      service: "Plumbing Repair",
      date: "2 days ago",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      rating: 4,
      comment: "Good work on the electrical installation. Would recommend to others.",
      service: "Electrical Work",
      date: "1 week ago",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      customerName: "Emily Davis",
      rating: 5,
      comment: "Amazing house cleaning service! Very thorough and attention to detail was impressive.",
      service: "House Cleaning",
      date: "2 weeks ago",
      avatar: "https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    // In a real app, this would submit to the backend
    alert('Review submitted successfully!');
    setRating(0);
    setReview('');
  };

  const renderStars = (currentRating, interactive = false, size = 'w-6 h-6') => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoveredStar || rating) : currentRating)
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800">Reviews & Ratings</h1>
          <p className="text-gray-600 mt-2">Share your experience and help others make informed decisions</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Write Review Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Write a Review</h2>
            
            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Recent Plumbing Service - Mike Smith</option>
                  <option>House Cleaning - Jane Doe</option>
                  <option>Electrical Repair - Tom Wilson</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center space-x-4">
                  {renderStars(rating, true, 'w-8 h-8')}
                  <span className="text-sm text-gray-600">
                    {rating === 0 ? 'Select rating' : 
                     rating === 1 ? 'Poor' :
                     rating === 2 ? 'Fair' :
                     rating === 3 ? 'Good' :
                     rating === 4 ? 'Very Good' : 'Excellent'}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with the service provider..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {review.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitReview}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Reviews</h2>
            
            <div className="space-y-6">
              {recentReviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.customerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">{review.customerName}</h4>
                          <p className="text-sm text-gray-600">{review.service}</p>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        {renderStars(review.rating, false, 'w-4 h-4')}
                        <span className="text-sm text-gray-600">
                          {review.rating}/5
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        {review.comment}
                      </p>
                      
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful (12)</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Rating Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">4.6</div>
                <div className="flex justify-center mb-2">
                  {renderStars(5, false, 'w-6 h-6')}
                </div>
                <p className="text-gray-600">Based on 127 reviews</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-4">{stars}</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stars === 5 ? '89' : stars === 4 ? '25' : stars === 3 ? '9' : stars === 2 ? '3' : '1'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSystem;