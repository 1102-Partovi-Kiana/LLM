import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react';
import TinderCard from 'react-tinder-card';
import furnitureData from '../data/furniture.json';
import './TinderCards.css';

// Fisher-Yates shuffle
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const TinderCards = forwardRef((props, ref) => {
  const [items, setItems] = useState(() => shuffleArray(furnitureData));
  const [lastSwiped, setLastSwiped] = useState(null);
  const visibleItems = items.slice(0, 5);
  const cardRefs = useRef(visibleItems.map(() => React.createRef()));

  const swiped = (direction, nameToDelete) => {
    const swipedItem = items.find((item) => item.name === nameToDelete);
    setLastSwiped(swipedItem); // Save the last swiped card
    setItems((prevItems) =>
      prevItems.filter((item) => item.name !== nameToDelete)
    );
  };

  useImperativeHandle(ref, () => ({
    swipe: (dir) => {
      const topIndex = visibleItems.length - 1;
      if (topIndex >= 0 && cardRefs.current[topIndex]?.current) {
        cardRefs.current[topIndex].current.swipe(dir);
      }
    },
    rewind: () => {
      if (lastSwiped) {
        setItems((prev) => [lastSwiped, ...prev]);
        setLastSwiped(null);
      }
    },
    superLike: () => {
      const topCard = visibleItems[visibleItems.length - 1];
      if (topCard) {
        console.log(`Super liked: ${topCard.name}`);
        swiped('up', topCard.name);
      }
    },
    boost: () => {
      console.log('🚀 Boost activated! Showing your profile more for 30 minutes.');
    }
  }));


  return (
    <div className="tinderCards">
      <h2>Swipe Right to Like ❤️</h2>
      <div className="tinderCards__container">
        {visibleItems.map((item, index) => (
          <TinderCard
            className="swipe"
            key={item.id}
            ref={cardRefs.current[index]}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, item.name)}
            onCardLeftScreen={() =>
              console.log(`${item.name} left the screen`)
            }
          >
            <div className="card">
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <h3>{item.name}</h3>
              <p>{item.category} › {item.subCategory}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
});

export default TinderCards;


