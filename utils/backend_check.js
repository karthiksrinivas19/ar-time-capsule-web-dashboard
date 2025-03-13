'use client'

import { useEffect, useState } from "react";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from './nhost'

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
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const { data, error } = await nhost.graphql.request(getMovies);

      setMovies(data.movies);
      setLoading(false);
    }

    fetchMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;