export function Slide({ imageUrl, sliderContent }) {
    return (
        <div className="slider-wrap">
            <div className="slider-content">
                <h3>{sliderContent}</h3>
            </div>
            <img src={imageUrl} alt="" />
        </div>
    )
}