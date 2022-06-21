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
        <img className='front' src={card.src} width='80' height='116.54' alt='card front'/>
        <img className='back' src='/img/Card_back_1.svg' 
          onClick={handleClick} width='80' height='116.54' alt='card back'/>
      </div>
    </div>
  );
}
 
export default Card;