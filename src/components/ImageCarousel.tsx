import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './ImageCarousel.css';

export default function ImageCarousel() {
    return (
        <Carousel showThumbs={false} infiniteLoop autoPlay width={600}>
            <div className='img-car-container'>
                <img src="/Images/jack1.png" alt="Jack 1" />
            </div>
            <div className='img-car-container'>
                <img src="/Images/boozer1.png" alt="Boozer" />
            </div>
            <div className='img-car-container'>
                <img src="/Images/boozer2.png" alt="Boozer" />
            </div>
        </Carousel>
    );
}
