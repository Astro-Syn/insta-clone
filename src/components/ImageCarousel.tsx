import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './ImageCarousel.css';

export default function ImageCarousel() {
    return (
        <Carousel 
        showThumbs={false}
        showArrows={false}
        showStatus={false} 
        showIndicators={false}
        infiniteLoop 
        autoPlay 
        width={600}
        interval={4000}
        swipeable
        emulateTouch
        >
            <div className='img-car-container'>
                <img src="/Images/deacon-church.jpg" alt="church" />
            </div>
            <div className='img-car-container'>
                <img src="/Images/boozer1.png" alt="Boozer" />
            </div>
            <div className='img-car-container'>
                <img src="/Images/boozer2.png" alt="Boozer" />
            </div>
            <div className='img-car-container'>
                <img src="/Images/gas-station2.jpg" alt="Gas Station" />
            </div>
            <div className='img-car-container'>
                <img src="/Images/skizzo-deacon4.jpg" alt="Deacon" />
            </div>
        </Carousel>
    );
}
