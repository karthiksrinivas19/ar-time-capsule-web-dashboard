'use client'

import { useEffect, useState } from "react";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from '../../utils/nhost';

interface SpatialNote {
  id: string;
  user_id: string;
  context: string;
  longitude: number;
  latitude: number;
}

const getData = `
  query {
    spatial_notes {
      id
      user_id
      context
      longitude
      latitude
    }
  }
`;

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <Home />
    </NhostProvider>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<SpatialNote[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching notes...');
        const response = await nhost.graphql.request(getData);
        console.log('GraphQL Response:', response);

        if (response.error) {
          console.error('GraphQL Error:', response.error);
          setError(`GraphQL Error: ${JSON.stringify(response.error)}`);
          return;
        }

        if (!response.data) {
          console.error('No data received');
          setError('No data received from server');
          return;
        }

        if (!response.data.spatial_notes) {
          console.error('No spatial_notes in response:', response.data);
          setError('Invalid data structure received');
          return;
        }

        setNotes(response.data.spatial_notes);
        console.log('Notes set:', response.data.spatial_notes);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-red-500 font-bold">Error</h2>
        <pre className="mt-2 p-2 bg-red-50 rounded">{error}</pre>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Context</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.user_id}</td>
                <td>{note.context}</td>
                <td>{note.latitude}, {note.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;