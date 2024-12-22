
import "../styles/card.scss"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Card({eventDetails, openOverlay}: any) {
    const imageUrl = `http://localhost:1337${eventDetails.cover.url}`;
    
    return <div className="card">
        <div className="cover">
            {imageUrl ? (
                <img src={imageUrl} onClick={() => openOverlay(eventDetails)} alt="Fetched from Strapi" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
        <div className="details">
            <div className="title">
                {eventDetails.title}
            </div>
            <div className="event-date">
                <img src="/calendar.svg" alt="image" />
                {eventDetails.createdTime}
            </div>
        </div>
    </div>
}

export default Card;