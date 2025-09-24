import React from 'react';
import { Star, Clock, DollarSign, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {service.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-600">
              ${service.basePrice}
            </span>
            <span className="text-sm text-gray-500">starting</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{service.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(service.rating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({service.reviewCount} reviews)
            </span>
          </div>

          <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;