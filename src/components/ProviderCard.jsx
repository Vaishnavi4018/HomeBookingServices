import React from 'react';
import { Star, MapPin, Phone, Mail, CheckCircle, Clock, DollarSign } from 'lucide-react';

const ProviderCard = ({ provider, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {provider.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-800">{provider.rating}</span>
                <span className="text-sm text-gray-500">({provider.reviewCount})</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">{provider.speciality}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{provider.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{provider.experience} exp.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-gray-700 text-sm mb-3">"{provider.bio}"</p>
          
          <div className="flex flex-wrap gap-2">
            {provider.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {provider.skills.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{provider.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-600">${provider.hourlyRate}/hr</span>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              provider.availability === 'available' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {provider.availability === 'available' ? 'Available' : 'Busy'}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            View Profile
          </button>
          <button
            onClick={onSelect}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;