export default function ShowCard({ show, summary, onAdd }) {
    return (
        <article className="show-card">
            {show.image && <img src={show.image.medium} alt={show.name} />}
            <h3>{show.name}</h3>
            {show.premiered && <p className="details">{show.premiered.slice(0, 4)}</p>}
            <p className="details">{show.genres.join(", ")}</p>
            {summary && <p className="summary">{summary}</p>}
            <button className="add-button" onClick={onAdd}>Add to Watchlist</button>
        </article>
    )
}