import NavBar from "../components/NavBar";
import '../styles/event.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

interface Event {
    id: string;
    title: string;
    createdTime: string;
    cover: {
        url: string;
    };
}

const eventCategories = [
    {
        label: 'All',
        key: 'all',
    },
    {
        label: 'Plantation day',
        key: 'plantation_day',
    },
    {
        label: 'Annual day',
        key: 'annual_day',
    },
    {
        label: 'Sports day',
        key: 'sports_day',
    },
    {
        label: 'NCC (National cadet corps)',
        key: 'ncc',
    },
    {
        label: 'Science labs',
        key: 'science_labs',
    },
    {
        label: 'Alumni association',
        key: 'alumni_association',
    },
    {
        label: 'Cleanliness drive',
        key: 'cleanliness_drive',
    }
]

function Home() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setCategory] = useState('all');
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [selectedEventIndex, setSelectedEventIndex] = useState(-1);
    const [isViewMoreVisible, setViewMore] = useState(false);
    const [pageSize, setPageSize] = useState(3);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);

    const closeOverlay = () => {
        setOverlayVisible(false);
        setSelectedEventIndex(-1);
    };
    const goToPrevious = () => {
        setSelectedEventIndex(preIndex => {
            setIsPrevDisabled(preIndex == 1);
            setIsNextDisabled(false);
            return preIndex-1;
        });
    }
    const goToNext = () => {
        setSelectedEventIndex(preIndex => {
            setIsPrevDisabled(false);
            setIsNextDisabled(preIndex == events.length - 2);
            return preIndex+1;
        });
    }

    const openOverlayFromCard = (eventDetails: Event) => {
        const index = events.findIndex((event: Event) => eventDetails.id == event.id)
        setSelectedEventIndex(index);
        setOverlayVisible(true);
        setIsNextDisabled(index == events.length - 1);
        setIsPrevDisabled(index == 0);
    }

    const onClickViewMore = () => {
        setPageSize(prevSize => prevSize + 3);
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if(selectedCategory == 'all'){
                    const response = await axios.get(`http://localhost:1337/api/events?populate=cover&pagination[page]=1&pagination[pageSize]=${pageSize}`);
                    setEvents(response.data.data);
                    setViewMore(response.data.meta.pagination.total > response.data.data.length ? true : false);
                } else {
                    const response = await axios.get(`http://localhost:1337/api/events?filters[category][$eq]=${selectedCategory}&populate=cover&pagination[page]=1&pagination[pageSize]=${pageSize}`);
                    setEvents(response.data.data);
                    setViewMore(response.data.meta.pagination.total > response.data.data.length ? true : false);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        }
        fetchEvents();
    },[selectedCategory, pageSize]);

    return <>
        <NavBar>
            <div className="headline-background">
                <div className="headline">
                    <div className="title">
                        Our events gallery
                    </div>
                    <div className="description">
                        Events at DBTR are filled with joyous occasions, cultural gatherings, and learning opportunities that bring us all together.
                    </div>
                </div>
            </div>
            <div className="event-categories">
                {eventCategories.map((category) =>
                    <button className={`category ${category.key == selectedCategory ? "active": ""}`} key={category.key} onClick={() => setCategory(category.key)}>
                        {category.label}
                    </button>
                )}
            </div>
            <div className="event-list">
                {events.map((event: Event) => <Card key={event.id} eventDetails={event} openOverlay={openOverlayFromCard}></Card>)}
                {isOverlayVisible && selectedEventIndex != -1 && (
                    <div className="overlay" onClick={closeOverlay}>
                        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                            <button className={`arrow left ${isPrevDisabled ? 'btn-disabled': ''}`} onClick={goToPrevious} disabled={isPrevDisabled}>
                                <img src='/left_arrow.svg' alt="image" />
                            </button>
                            <img src={`http://localhost:1337${(events[selectedEventIndex] as Event).cover.url}`} alt="image" className="magnified-image" />
                            <div className="desc">
                                <div className="title">{(events[selectedEventIndex]as Event).title}</div>
                                <div className="date">{(events[selectedEventIndex]as Event).createdTime}</div>
                            </div>
                            <button className={`arrow right ${isNextDisabled ? 'btn-disabled': ''}`} onClick={goToNext} disabled={isNextDisabled}>
                                <img src='/right_arrow.svg' alt="image" />
                            </button>
                            <button className="close-button" onClick={closeOverlay}>
                                <img src='/close.svg' alt="image" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="view-more">
                {isViewMoreVisible ? 
                    <button
                        type='button'
                        className="btn btn-secondary"
                        onClick={onClickViewMore}
                    >
                        View more
                    </button>
                    :  null 
                }
            </div>
        </NavBar> 
    </>
}

export default Home;