import { useState, useEffect } from 'react'
import './App.css'
import ShowCard from './components/ShowCard';
import WatchlistCard from './components/WatchlistCard';
function stripTags(html) {
  return html ? html.replace(/<[^>]*>/g, "") : "";
}

function App() {

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  })

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist])

  async function handleSearch(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    setError("");
    try {
      const url = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(searchText.trim());
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  function addToWatchlist(show) {
    if (watchlist.some((saved) => saved.id === show.id)) {
      return;
    }
    const newShow = {
      id: show.id,
      name: show.name,
      image: show.image,
      premiered: show.premiered,
      genres: show.genres,
      status: "Plan to Watch",
    }
    setWatchlist([...watchlist, newShow]);
    console.log(newShow);
  }

  function removeFromWatchlist(id) {
    if (confirm("Delete this show from your watchlist?")) {
      setWatchlist(watchlist.filter((saved) => saved.id !== id));
    }
  }

  function updateStatus(id, newStatus) {
    setWatchlist(watchlist.map((saved) =>
      saved.id === id ? { ...saved, status: newStatus } : saved
    ));
  }

  return (<main>
    <h1>TV Watchlist</h1>
    <form onSubmit={handleSearch}>
      <label htmlFor="search">Search for a Show</label>
      <input id="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} required />
      <button type="submit">Search</button>
    </form>

    {isLoading && <p>Searching...</p>}
    {error && <p>{error}</p>}
    {hasSearched && !isLoading && !error && searchResults.lenghth === 0 && <p>No results found.</p>}
    <div className="card-grid">
      
      {searchResults.map((result) => (
        <ShowCard
          key={result.show.id}
          show={result.show}
          summary={stripTags(result.show.summary)}
          onAdd={() => addToWatchlist(result.show)}
        />
      ))}
    </div>

    <h2>My Watchlist</h2>
    {watchlist.length === 0 && <p>Your watchlist is empty</p>}
    <div className="card-grid">
      {watchlist.map((show) => (
        <WatchlistCard
          key={show.id}
          show={show}
          onStatusChange={(newStatus) => updateStatus(show.id, newStatus)}
          onRemove={() => removeFromWatchlist(show.id)}
        />
      ))}

    </div>
  </main>);
}

export default App
