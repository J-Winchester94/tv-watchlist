import { useState, useEffect } from 'react'
import './App.css'
import ShowCard from './components/ShowCard';
function stripTags(html) {
  return html ? html.replace(/<[^>]*>/g, "") : "";
}

function App() {

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  })
  
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]) 

  async function handleSearch(event) {
    event.preventDefault();
    const url = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(searchText.trim());
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(data);
  }

  return (<main>
    <h1>TV Watchlist</h1>
    <form onSubmit={handleSearch}>
      <input id="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} required />
      <label htmlFor="search">Search for a Show</label>
      <button type="submit">Search</button>
    </form>

    <div className="card-grid">
      {searchResults.map((result) => (
        <ShowCard
          key={result.show.id}
          image={result.show.image}
          name={result.show.name}
          premiered={result.show.premiered}
          genres={result.show.genres} 
        />
      ))}
    </div>
  </main>);
}



export default App
