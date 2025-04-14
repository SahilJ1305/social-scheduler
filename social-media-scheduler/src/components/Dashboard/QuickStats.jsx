import { useEffect, useState } from "react";

export default function QuickStats() {
    const [statsData, setStatsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const stats = [
      { icon: 'paper-plane', color: 'bg-blue-100', textColor: 'text-blue-500', label: 'Scheduled Posts', value: '12' },
      { icon: 'check-circle', color: 'bg-green-100', textColor: 'text-green-500', label: 'Published Posts', value: '56' },
      { icon: 'chart-line', color: 'bg-purple-100', textColor: 'text-purple-500', label: 'Avg. Engagement', value: '24%' }
    ];


    useEffect(() => {
      async function fetchQucikStatsData(){
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/quickStats');
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          
          const reqData = await response.json();
          setStatsData(reqData);

        } catch (error) {
          console.error('Error fetching Quick Stats data..',error);
        } finally {
          setLoading(false);
        }
      }

      fetchQucikStatsData();
    }, []);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} ${stat.textColor} mr-4`}>
                <i className={`fas fa-${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }