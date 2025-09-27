import React, { useState } from 'react';
import './ArtworkSlider.css';

function ArtworkSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="artwork-slider-container">
            <div className="artwork-slider">
                <button className="slider-btn prev-btn" onClick={goToPrevious}>&lt;</button>
                <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div className="slider-slide" key={index}>
                            <img src={image.url} alt={`Artwork view ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className="slider-btn next-btn" onClick={goToNext}>&gt;</button>
            </div>
            <div className="slider-thumbnails">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail-img ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ArtworkSlider;