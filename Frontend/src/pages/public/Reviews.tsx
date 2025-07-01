import React, { useState } from "react";
import { Star, ThumbsUp, MessageCircle, TrendingUp, Award, Users } from "lucide-react";

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const reviews = [
    { 
      user: "Alice Chen", 
      rating: 4, 
      comment: "Amazing flavors and presentation! The pasta was cooked to perfection and the service was outstanding.",
      date: "2 days ago",
      dish: "Truffle Carbonara",
      avatar: "AC",
      verified: true,
      likes: 12
    },
    { 
      user: "Bob Martinez", 
      rating: 5, 
      comment: "Best dining experience I've had in years! Every bite was a masterpiece. Will definitely be back!",
      date: "1 week ago",
      dish: "Wagyu Steak",
      avatar: "BM",
      verified: true,
      likes: 28
    },
    { 
      user: "John Smith", 
      rating: 3, 
      comment: "Good food but service was a bit slow. The atmosphere is nice though.",
      date: "3 days ago",
      dish: "Caesar Salad",
      avatar: "JS",
      verified: false,
      likes: 5
    },
    { 
      user: "Sarah Johnson", 
      rating: 5, 
      comment: "Absolutely incredible! The chef's special was divine and the wine pairing was perfect.",
      date: "5 days ago",
      dish: "Chef's Special",
      avatar: "SJ",
      verified: true,
      likes: 34
    },
    { 
      user: "Mike Davis", 
      rating: 4, 
      comment: "Great ambiance and delicious food. The dessert was the highlight of our evening.",
      date: "1 week ago",
      dish: "Chocolate Soufflé",
      avatar: "MD",
      verified: false,
      likes: 18
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const filteredReviews = selectedFilter === "all" 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedFilter));

  const renderStars = (rating: number, interactive = false, size = "w-5 h-5") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400 transition-colors" : ""}`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "from-green-500 to-emerald-500";
    if (rating >= 4) return "from-yellow-500 to-orange-500";
    if (rating >= 3) return "from-orange-500 to-red-500";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl mb-6 shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Food Reviews
          </h1>
          <p className="text-gray-600 text-lg">Discover what our customers love about their dining experience</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
              </div>
              <div className="flex">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <div className="mt-4">
              <div className={`h-2 bg-gradient-to-r ${getRatingColor(averageRating)} rounded-full`}></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-800">{totalReviews}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+12% this month</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Satisfaction</p>
                <p className="text-3xl font-bold text-gray-800">94%</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">Based on 4+ star reviews</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {["all", "5", "4", "3", "2", "1"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                  : "bg-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-md"
              }`}
            >
              {filter === "all" ? "All Reviews" : `${filter} Stars`}
              {filter !== "all" && (
                <Star className="inline w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
              )}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6">
          {filteredReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-800 text-lg">{review.user}</h3>
                      {review.verified && (
                        <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex space-x-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{review.dish}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-4">{review.comment}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.likes} helpful</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>

              {/* Progress bar for visual rating */}
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getRatingColor(review.rating)} transition-all duration-1000 ease-out`}
                    style={{ width: `${review.rating * 20}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-lg mb-6 opacity-90">Help others discover great food by leaving your review</p>
            <button className="bg-white text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;