import NavBar from "./NavBar";
import '../styles/event.scss';
import { useEffect, useState } from "react";
import axios from "axios";

interface Event {
    id: string;
    title: string;
}

function Home() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setCategory] = useState('all');
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if(selectedCategory == 'all'){
                    const response = await axios.get("http://localhost:1337/api/events");
                    setEvents(response.data.data);
                } else {
                    const response = await axios.get(`http://localhost:1337/api/events?filters[category][$eq]=${selectedCategory}`);
                    setEvents(response.data.data);
                }  
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        }
        fetchEvents();
    },[selectedCategory]);

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
        }
    ]
    return <>
        <NavBar>
            <div className="headline">
                <div className="title">
                    Our events gallery
                </div>
                <div className="description">
                    Events at DBTR are filled with joyous occasions, cultural gatherings, and learning opportunities that bring us all together.
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
                {events.map((event: Event) => <div className="card" key={event.id}>{event.title}</div>)}
            </div>
        </NavBar> 
    </>
}

export default Home;