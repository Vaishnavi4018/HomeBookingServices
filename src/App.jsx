import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bell, User, Calendar, Star, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import ProviderCard from './components/ProviderCard';
import BookingForm from './components/BookingForm';
import Dashboard from './components/Dashboard';
import ReviewSystem from './components/ReviewSystem';
import { mockServices, mockProviders, mockBookings } from './utils/mockData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your plumbing service is confirmed for tomorrow", type: "success", time: "2 hours ago" },
    { id: 2, message: "New provider available in your area", type: "info", time: "1 day ago" }
  ]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleBookingComplete = (bookingData) => {
    const newBooking = {
      id: bookings.length + 1,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
    setCurrentView('dashboard');
    
    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      message: `Booking confirmed for ${bookingData.service} on ${bookingData.date}`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications([newNotification, ...notifications]);
  };

  const renderCurrentView = () => {
    switch(currentView) {
      case 'services':
        return <ServicesView onServiceSelect={setSelectedService} onViewChange={setCurrentView} />;
      case 'providers':
        return <ProvidersView onProviderSelect={setSelectedProvider} onViewChange={setCurrentView} />;
      case 'booking':
        return <BookingForm 
          service={selectedService} 
          provider={selectedProvider}
          onBookingComplete={handleBookingComplete}
          onBack={() => setCurrentView('services')} 
        />;
      case 'dashboard':
        return <Dashboard 
          user={user} 
          bookings={bookings} 
          notifications={notifications}
          onViewChange={setCurrentView}
        />;
      case 'reviews':
        return <ReviewSystem onBack={() => setCurrentView('dashboard')} />;
      default:
        return <HomeView onViewChange={setCurrentView} onServiceSelect={setSelectedService} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogin={handleLogin}
        onViewChange={setCurrentView}
        currentView={currentView}
        notificationCount={notifications.length}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  );
}

// Home View Component
const HomeView = ({ onViewChange, onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Find Trusted Home Service Professionals</h1>
          <p className="text-xl mb-8 opacity-90">Book plumbers, electricians, cleaners, and more with just a few clicks</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="What service do you need?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            />
            <button 
              onClick={() => onViewChange('services')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Professionals</h3>
              <p className="text-gray-600">All service providers are background-checked and verified for your safety and peace of mind.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Top-Rated Service</h3>
              <p className="text-gray-600">Read genuine reviews and ratings from real customers to make informed decisions.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Booking</h3>
              <p className="text-gray-600">Book services instantly and get confirmation within minutes. Track your service in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.slice(0, 8).map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onClick={() => {
                  onServiceSelect(service);
                  onViewChange('providers');
                }}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => onViewChange('services')}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Services View Component
const ServicesView = ({ onServiceSelect, onViewChange }) => {
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'plumbing', 'electrical', 'cleaning', 'appliance', 'painting', 'gardening'];

  useEffect(() => {
    let filtered = mockServices;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">All Services</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onClick={() => {
              onServiceSelect(service);
              onViewChange('providers');
            }}
          />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Providers View Component
const ProvidersView = ({ onProviderSelect, onViewChange }) => {
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const sorted = [...mockProviders].sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });
    setFilteredProviders(sorted);
  }, [sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Available Providers</h1>
        
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredProviders.length} providers available</p>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
            <option value="reviews">Sort by Reviews</option>
          </select>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProviders.map(provider => (
          <ProviderCard 
            key={provider.id} 
            provider={provider} 
            onSelect={() => {
              onProviderSelect(provider);
              onViewChange('booking');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;







