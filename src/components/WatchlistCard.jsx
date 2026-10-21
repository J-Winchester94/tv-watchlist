export default function WatchlistCard({ show, onStatusChange, onRemove }) {
    return (
        <article className="show-card">
            {show.image && <img src={show.image.medium} alt={show.name} />}
            <h3>{show.name}</h3>
            <div className="card-actions">
                <select value={show.status} onChange={(event) => onStatusChange(event.target.value)}>
                    <option>Plan to Watch</option>
                    <option>Watching</option>
                    <option>Finished</option>
                </select>
                <button className="delete-button" onClick={onRemove}>Delete</button>
            </div>
        </article>
    )
}