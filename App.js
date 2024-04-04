import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import GameStartScreen from './screens/GameStartScreen';
import GameScreen from './screens/GameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessCount, setGuessCount] = useState(0)

  function startNewGameHandler() {
    setUserNumber(null)
    setGuessCount(0)
  }

  function sendedNumberHandler(sendedNumber) {
    setUserNumber(sendedNumber);
    setGameIsOver(false)
  }

  function gameOverHandler(numberofGuess){
    setGameIsOver(true)
    setGuessCount(numberofGuess)
  }

  let screen = <GameStartScreen onSendNumber={sendedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber){
    screen = <GameOverScreen onStartNewGame={startNewGameHandler} roundsNumber={guessCount} userNumber={userNumber}  />
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(0,0,0,0.8)', 'transparent']}
    >
      <ImageBackground
        style={styles.container}
        source={require('./assets/back.jpg')}
        imageStyle={styles.backImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage: {
    opacity: 0.2,
  },
});
