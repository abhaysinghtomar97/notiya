'use client'
import React, { useState } from 'react';

// Utility to extract the YouTube ID
const getYouTubeId = (urlOrId) => {
  if (!urlOrId) return null;
  if (urlOrId.length === 11 && !urlOrId.includes('/')) return urlOrId;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = urlOrId.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Utility to get the high-res thumbnail
const getThumbnail = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const LandscapeVideoCarousel = ({ videos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!videos || videos.length === 0) {
    return <div style={{ color: 'white', textAlign: 'center' }}>No videos provided.</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const getOffset = (index) => {
    let offset = (index - currentIndex) % videos.length;
    if (offset < -Math.floor(videos.length / 2)) offset += videos.length;
    if (offset > Math.floor(videos.length / 2)) offset -= videos.length;
    return offset;
  };

  return (
    <div style={styles.carouselWrapper}>
      <div style={styles.cardsContainer}>
        {videos.map((video, index) => {
          // Extract ID from the new object structure (video.url)
          const videoId = getYouTubeId(video.url);
          const offset = getOffset(index);
          const isCenter = offset === 0;

          return (
            <div
              key={index}
              style={{
                ...styles.card,
                ...getCardDynamicStyles(offset),
              }}
              onClick={() => {
                if (!isCenter) setCurrentIndex(index);
              }}
            >
              {/* Top: 16:9 Video/Thumbnail Area */}
              <div style={styles.mediaWrapper}>
                {isCenter ? (
                  <iframe
                    style={styles.iframe}
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={getThumbnail(videoId)}
                    alt={video.title}
                    style={styles.thumbnail}
                  />
                )}
                {!isCenter && <div style={styles.darkOverlay}></div>}
              </div>

              {/* Bottom: Title Area */}
              <div style={styles.titleWrapper}>
                <h3 style={styles.titleText}>{video.title}</h3>
              </div>
            </div>
          );
        })}

        {videos.length > 1 && (
          <>
            <button onClick={prevSlide} style={{ ...styles.arrowBtn, left: '10%' }}>
              &#10094;
            </button>
            <button onClick={nextSlide} style={{ ...styles.arrowBtn, right: '10%' }}>
              &#10095;
            </button>
          </>
        )}
      </div>

      {videos.length > 1 && (
        <div style={styles.dotsContainer}>
          {videos.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                ...styles.dot,
                opacity: currentIndex === index ? 1 : 0.4,
                width: currentIndex === index ? '24px' : '8px',
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const styles = {
  carouselWrapper: {
    width: '100%',
    backgroundColor: 'amber',
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardsContainer: {
    position: 'relative',
    width: '100%',
    height: '450px', // Increased slightly to account for the title height below the video
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    position: 'absolute',
    top: '50%',
    width: '60%',
    maxWidth: '640px',
    minWidth: '280px',
    backgroundColor: '#1a1a1a', // Dark gray background for the card itself
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
    display: 'flex',
    flexDirection: 'column',
  },
  mediaWrapper: {
    width: '100%',
    aspectRatio: '16 / 9', // Ensures only the video portion stays 16:9
    position: 'relative',
    backgroundColor: '#000',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    pointerEvents: 'none',
  },
  titleWrapper: {
    padding: '16px',
    textAlign: 'center',
  },
  titleText: {
    margin: 0,
    color: '#ffffff',
    fontSize: '18px',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Truncates long titles with "..."
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '32px',
    cursor: 'pointer',
    zIndex: 10,
    padding: '10px',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },
  dotsContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
  },
  dot: {
    height: '8px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

const getCardDynamicStyles = (offset) => {
  let left = '50%';
  let scale = 1;
  let opacity = 0;
  let zIndex = 0;

  if (offset === 0) {
    left = '50%';
    scale = 1;
    zIndex = 5;
    opacity = 1;
  } else if (offset === 1) {
    left = '75%';
    scale = 0.8;
    zIndex = 4;
    opacity = 0.6;
  } else if (offset === -1) {
    left = '25%';
    scale = 0.8;
    zIndex = 4;
    opacity = 0.6;
  } else if (offset === 2) {
    left = '90%';
    scale = 0.6;
    zIndex = 3;
    opacity = 0.3;
  } else if (offset === -2) {
    left = '10%';
    scale = 0.6;
    zIndex = 3;
    opacity = 0.3;
  }

  return {
    left,
    transform: `translate(-50%, -50%) scale(${scale})`,
    zIndex,
    opacity,
    boxShadow: offset === 0 ? '0 10px 40px rgba(0, 0, 0, 0.8)' : 'none',
    cursor: offset === 0 ? 'default' : 'pointer',
  };
};

export default LandscapeVideoCarousel;