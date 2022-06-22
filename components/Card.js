import {BrowserView, MobileView} from 'react-device-detect';

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = (e) => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className='card' key={card.id}>
      <div className={flipped ? 'flipped' : ''}>
        {/* width='208' height='303' */}
        <BrowserView>
          <img className='front' src={card.src} width='100' height='145' alt='card front'/>
          <img className='back' src='/img/Card_back_1.svg' 
            onClick={handleClick} width='100' height='145' alt='card back'/>
        </BrowserView>
        <MobileView>
          <img className='front' src={card.src} width='80' height='90' alt='card front'/>
          <img className='back' src='/img/Card_back_2.svg' 
            onClick={handleClick} width='80' height='90' alt='card back'/>
        </MobileView>
      </div>
    </div>
  );
}
 
export default Card;