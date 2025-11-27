import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageCarousel() {
    return (
        <Carousel showThumbs={false} infiniteLoop autoPlay>
            <div>
                <img src="/Images/jack1.png" alt="Jack 1" />
            </div>
            <div>
                <img src="/Images/boozer1.png" alt="Boozer" />
            </div>
            <div>
                <img src="/Images/boozer2.png" alt="Boozer" />
            </div>
        </Carousel>
    );
}
