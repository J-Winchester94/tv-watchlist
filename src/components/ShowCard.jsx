export default function ShowCard({ show, summary, onAdd }) {
    return (
        <article className="show-card">
            {show.image && <img src={show.image.medium} alt={show.name} />}
            <h2>{show.name}</h2>
            {show.premiered && <p>{show.premiered.slice(0, 4)}</p>}
            <p>{show.genres.join(", ")}</p>
            {summary && <p>{summary}</p>}
            <button className="add-button" onClick={onAdd}>Add to Watchlist</button>
        </article>
    )
}