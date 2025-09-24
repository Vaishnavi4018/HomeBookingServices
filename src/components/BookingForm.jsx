import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';

const BookingForm = ({ service, provider, onBookingComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    urgency: 'normal',
    paymentMethod: 'card'
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const completeBookingData = {
      ...bookingData,
      service: service?.name || 'General Service',
      provider: provider?.name || 'Available Provider',
      providerId: provider?.id || 1,
      totalAmount: calculateTotal(),
      serviceType: service?.category || 'general'
    };
    
    onBookingComplete(completeBookingData);
  };

  const calculateTotal = () => {
    const basePrice = service?.basePrice || 80;
    const urgencyMultiplier = bookingData.urgency === 'urgent' ? 1.5 : 1;
    return Math.round(basePrice * urgencyMultiplier);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Date & Time</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Time
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {timeSlots.map(time => (
            <button
              key={time}
              type="button"
              onClick={() => handleInputChange('time', time)}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                bookingData.time === time
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <textarea
            value={bookingData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter your full address..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Details</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe the Issue
        </label>
        <textarea
          value={bookingData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Please provide details about the service you need..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Urgency Level
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('urgency', 'normal')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              bookingData.urgency === 'normal'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">Normal</div>
            <div className="text-sm opacity-70">Standard pricing</div>
          </button>
          
          <button
            type="button"
            onClick={() => handleInputChange('urgency', 'urgent')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              bookingData.urgency === 'urgent'
                ? 'bg-orange-50 border-orange-500 text-orange-700'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">Urgent</div>
            <div className="text-sm opacity-70">+50% surcharge</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment & Confirmation</h3>
      
      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Booking Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{service?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Provider:</span>
            <span className="font-medium">{provider?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Urgency:</span>
            <span className={`font-medium ${bookingData.urgency === 'urgent' ? 'text-orange-600' : 'text-green-600'}`}>
              {bookingData.urgency.charAt(0).toUpperCase() + bookingData.urgency.slice(1)}
            </span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <div className="space-y-2">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={bookingData.paymentMethod === 'card'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-blue-600"
            />
            <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-400" />
            <span>Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={bookingData.paymentMethod === 'cash'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-blue-600"
            />
            <span className="w-5 h-5 ml-3 mr-2 bg-green-500 rounded text-white text-xs flex items-center justify-center">$</span>
            <span>Cash Payment</span>
          </label>
        </div>
      </div>

      {bookingData.paymentMethod === 'card' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="CVV"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Providers
          </button>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center space-x-4">
              {service && (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Book {service?.name || 'Service'}
                </h1>
                {provider && (
                  <p className="text-gray-600">with {provider.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map(stepNumber => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-2">
            <span className="text-sm text-gray-600">Date & Time</span>
            <span className="text-sm text-gray-600">Details</span>
            <span className="text-sm text-gray-600">Payment</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!bookingData.date || !bookingData.time || !bookingData.address)) ||
                    (step === 2 && !bookingData.description)
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;