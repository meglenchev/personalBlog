import { useState } from "react";

export function Slide({ imageUrl, sliderContent }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="slider-wrap">
            {!isLoaded && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
            <div className="slider-content">
                <h3>{sliderContent}</h3>
            </div>
            <img src={imageUrl} alt="" onLoad={() => setIsLoaded(true)} style={{ display: isLoaded ? 'block' : 'none' }} />
        </div>
    )
}