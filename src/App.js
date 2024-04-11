import Axios from 'axios';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch, faMusic } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  function searchLyrics() {
    if (artist === '' || song === '') {
      setError('please fill in the artist name and song title fields');
      return;
    }
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then(res => {
        console.log(res.data.lyrics);
        setLyrics(res.data.lyrics);
        setError('');
      })
      .catch(error => {
        console.error('!! Lyrics not found please try again.', error);
        setLyrics('');
        setError('!! Lyrics not found please try again.');
      });
  }

  return (
    <div className="main-container">
      <h1>
        Lyrics Finder
        <FontAwesomeIcon icon={faMusic} />
      </h1>

      <input
        className="artist-input"
        type="text"
        placeholder="Artist name"
        onChange={e => {
          setArtist(e.target.value);
        }}
      />
      <input
        className="song-input"
        type="text"
        placeholder="Song name"
        onChange={e => {
          setSong(e.target.value);
        }}
      ></input>

      <button className="search-button" onClick={() => searchLyrics()}>
        <label className="icon">
          <FontAwesomeIcon icon={faSearch} />
        </label>
        Search
      </button>
      <hr />
      {error && <p className="error-message">{error}</p>}
      <pre>{lyrics}</pre>
    </div>
  );
}

export default App;
