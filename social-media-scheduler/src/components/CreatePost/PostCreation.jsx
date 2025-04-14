import { useEffect, useState } from 'react';
import { FiPlusCircle, FiImage, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function PostCreation() {
  // Post content state
  const [content, setContent] = useState('');
  
  // Platforms state - initialized as an array
  const [platforms, setPlatforms] = useState([
    { id: 'facebook', icon: <FaFacebookF />, color: 'bg-blue-500', name: 'Facebook', checked: true },
    { id: 'instagram', icon: <FaInstagram />, color: 'bg-pink-500', name: 'Instagram', checked: false },
    { id: 'twitter', icon: <FaTwitter />, color: 'bg-blue-400', name: 'Twitter', checked: false }
  ]);
  
  // Schedule state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Platform toggle handler
  const togglePlatform = (id) => {
    setPlatforms(prevPlatforms => 
      prevPlatforms.map(platform => 
        platform.id === id ? { ...platform, checked: !platform.checked } : platform
      )
    );
  };

  useEffect(() => {
    async function fetchConnectedPlatform(){
      try {
        const response = await fetch('http//localhost:3000/connectedAccounts');
        if(!response.ok) throw new Error('No Account data!!');
        const data = response.json();
        setPlatforms(data);
      } catch(error) {
        console.Error('Erro fetching user Accounts:- ',error);
      }
    }

    fetchConnectedPlatform();
  },[])

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        <FiPlusCircle className="mr-3 text-blue-500" />
        Create New Post
      </h2>
      
      <div className="flex items-start space-x-4">
        <img 
          src="https://randomuser.me/api/portraits/women/44.jpg" 
          alt="User" 
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
        />
        
        <div className="flex-1">
          {/* Post Content Area */}
          <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4" 
              className="w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" 
              placeholder="What's on your mind?"
            />
            
            <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <div className="flex space-x-3">
                <label className="text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
                  <FiImage className="text-xl" />
                  <input type="file" id="image-upload" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>
          
          {/* Platform Selector */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Select Platforms</h3>
            <div className="flex flex-wrap gap-4">
            {Array.isArray(platforms) && platforms.map((platform) => (
              <div key={platform.id} className="flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={platform.checked || false}
                    onChange={() => togglePlatform(platform.id)}
                  />
                  <div className={`w-11 h-6 ${platform.checked ? platform.color : 'bg-gray-200'} rounded-full peer`}>
                    <div className={`absolute top-0.5 left-[2px] w-5 h-5 bg-white rounded-full transition-transform ${platform.checked ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
                <div className="flex items-center text-gray-700">
                  <span className={`${platform.color} text-white p-1 rounded mr-2`}>
                    {platform.icon}
                  </span>
                  <span>{platform.name}</span>
                </div>
              </div>
            ))}
            </div>
          </div>
          
          {/* Schedule Options */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Schedule Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Post Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Post Time</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-3 mt-6">
            <button 
              type="button" 
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Save Draft
            </button>
            <button 
              type="button" 
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Post Now
            </button>
            <button 
              type="button" 
              className="px-6 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors flex items-center"
            >
              <FiClock className="mr-2" />
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}