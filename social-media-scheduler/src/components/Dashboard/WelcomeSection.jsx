import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeSection() {

    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [postScheduleCount, setPostScheduleCount] = useState(1);
    const navigate = useNavigate();

    function handleNavigation(){
      navigate('/create-post');
    }

    useEffect(() => {
      async function fetchUserName(){
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/WelcomeSection');
          const data = await response.json();
          setUserName(data.username);
          setPostScheduleCount(data.schedules);
          localStorage.setItem("username", data.username);
        } catch( error ){
            console.error("Error fetching username: ",error);
        } finally {
          setLoading(false);
        }
      }

      fetchUserName();
    },[])

    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">{loading ? 'Loading..' : `Welcome back, ${userName}!`}</h2>
            <p className="opacity-90">{postScheduleCount ? `You have ${postScheduleCount} scheduled posts for this week` : 'No schedules..'}</p>
          </div>
          <button onClick={handleNavigation} className="bg-white text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 flex items-center">
            <i className="fas fa-plus mr-2"></i> Create Post
          </button>
        </div>
      </div>
    );
  }