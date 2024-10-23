"use client"; // Ensure this file is treated as a Client Component
import { useEffect, useState } from 'react';
import { db } from './firebase/firebaseConfig'; // Adjust the path based on your setup
import { collection, getDocs } from 'firebase/firestore';

type UserSession = {
  id: string;
  sessionData: {
    userMessages: string[];
    openAiResponses: string[];
    platform: string;
    country: string;
  };
};

export default function Home() {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<UserSession | null>(null);
  const [platformFilter, setPlatformFilter] = useState<string>(''); // For platform filter
  const [countryFilter, setCountryFilter] = useState<string>('');   // For country filter

  const fetchSessions = async () => {
    const querySnapshot = await getDocs(collection(db, "user_sessions"));
    const sessionsArray: UserSession[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sessionsArray.push({
        id: doc.id,
        sessionData: {
          userMessages: data.userMessages || [],
          openAiResponses: data.openAiResponses || [],
          platform: data.platform || '',
          country: data.country || '',
        },
      } as UserSession);
    });
    setSessions(sessionsArray);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Filter sessions based on platform and country
  const filteredSessions = sessions.filter(session => {
    const matchesPlatform = platformFilter ? session.sessionData.platform === platformFilter : true;
    const matchesCountry = countryFilter ? session.sessionData.country === countryFilter : true;
    return matchesPlatform && matchesCountry;
  });

  return (
    <div className="h-screen justify-center items-center ">
      <h1 className='font-bold text-2xl text-center mt-6'>Conversation Flows</h1>

      {/* Filters Section */}
      <div className="flex justify-center my-4">
        <select
          className="mx-2 p-2 border rounded"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Whatsapp">WhatsApp</option>
          <option value="Website">Website</option>
          <option value="WebCall">WebCall</option>
        </select>

        <select
          className="mx-2 p-2 border rounded"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All Countries</option>
          <option value="TT">TT</option>
          <option value="USA">USA</option>
        </select>
      </div>

      <div className="flex bg-gray-300 p-6 mx-16 my-4 rounded-lg shadow-lg" style={{ borderRadius: '16px' }}>
        {/* Left Menu */}
        <div className="w-1/3 bg-gray-300 p-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
          <h2 className="text-xl p-2 font-semibold sticky top-0 bg-gray-300 z-10 border-b border-gray-400 p-2">User Sessions</h2>
          <ul className="mt-2">
            {filteredSessions.map(session => (
              <li
                key={session.id}
                className="cursor-pointer p-2 hover:bg-gray-400 rounded"
                onClick={() => setSelectedSession(session)}
              >
                {session.id} - {session.sessionData.platform} ({session.sessionData.country})
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Content */}
        <div className="w-2/3 px-8 bg-gray-100 overflow-y-auto rounded-r-lg" style={{ maxHeight: '75vh', scrollbarWidth: 'none' }}>
          {selectedSession ? (
            <>
              <h3 className="text-xl p-4 font-semibold sticky top-0 bg-gray-100 z-10 border-b border-gray-400 p-2">Session ID: {selectedSession.id}</h3>
              <div className="mt-4 space-y-2">
                {selectedSession.sessionData.userMessages.map((message, index) => {
                  const response = selectedSession.sessionData.openAiResponses[index] || "";

                  return (
                    <div key={index}>
                      <div className="flex justify-end mb-1">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <p className="font-bold">Customer:</p>
                          <p>{message}</p>
                        </div>
                      </div>
                      {response && (
                        <div className="flex justify-start">
                          <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                            <p className="font-bold">Emma:</p>
                            <p>{response}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-center">Select a session to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
}
