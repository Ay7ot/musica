import { useState, useEffect } from 'react';

function usePlaylists(accessToken) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => response.json())
      .then(data => {
        setPlaylists(data.items);
        setLoading(false);
      }).catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [accessToken]);

  return { playlists, loading, error };
}

export { usePlaylists }
