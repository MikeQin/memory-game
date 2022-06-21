import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import Card from '../components/Card'
import Image from 'next/image'

const cardImages = [
  // {src: "/img/9C.svg", matched: false},
  // {src: "/img/9S.svg", matched: false},
  {src: "/img/10C.svg", matched: false},
  {src: "/img/10D.svg", matched: false},
  {src: "/img/10H.svg", matched: false},
  {src: "/img/10S.svg", matched: false},
  {src: "/img/11C.svg", matched: false},
  {src: "/img/11D.svg", matched: false},
  {src: "/img/11H.svg", matched: false},
  {src: "/img/11S.svg", matched: false}
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .map((card) => ({ ...card, id: Math.floor(Math.random() * 1000000) }))
      .sort((a, b)=> (a.id - b.id))
      //.sort(()=> (Math.random() - 0.5))
      //.map((card, id) => ({ ...card, id: id }));
      //.map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // we can't check the results due to delayed, async updates
    // we have to use useEffect to perform the check
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        choiceOne.matched = true;
        choiceTwo.matched = true;
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 2000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turns
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Magic Match</title>
        <meta name="description" content="Magic matach game, developed using Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Magic Match</h1>
        <p>Two matched cards stay. To win, all cards are face up.<br/>
        The one with minimum turns is the best.</p>
        <button className={styles.button} onClick={shuffleCards}>New Game</button>
        <h2 style={{color: 'red'}}>Turns: {turns}</h2>

        <div className={styles.cardGrid}>
          {cards.map((card) => (
            <Card 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card.matched === true || card === choiceOne || card === choiceTwo}
              disabled={disabled}
            />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        Copyright &copy; 2022 TechSoft, Inc.
        {'  '}Powered by {' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" className={styles.filterBlue} width={72} height={16} />
        </span>
      </footer>
    </div>
  )
}
