import {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GameData} from '../data/data';

export const HistoryContext = createContext({});

export const HistoryProvider = ({children}) => {
  const [gameData, setGameData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [newArticles, setNewArticles] = useState([]);

  useEffect(() => {
    loadGameData();
    loadNewArticles();
  }, []);

  const loadGameData = async () => {
    try {
      const savedGameData = await AsyncStorage.getItem('gameData');
      if (savedGameData !== null) {
        setGameData(JSON.parse(savedGameData));
      } else {
        // If no saved data, use the initial GameData and save it to AsyncStorage
        setGameData(GameData);
        await AsyncStorage.setItem('gameData', JSON.stringify(GameData));
      }
    } catch (error) {
      console.error('Error loading game data:', error);
      setGameData(GameData); // Fallback to initial data if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const loadNewArticles = async () => {
    try {
      const savedArticles = await AsyncStorage.getItem('newArticles');
      if (savedArticles !== null) {
        setNewArticles(JSON.parse(savedArticles));
      }
    } catch (error) {
      console.error('Error loading new articles:', error);
    }
  };

  const saveGameData = async (updatedGameData) => {
    try {
      await AsyncStorage.setItem('gameData', JSON.stringify(updatedGameData));
      setGameData(updatedGameData);
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  const saveNewArticles = async (articles) => {
    try {
      await AsyncStorage.setItem('newArticles', JSON.stringify(articles));
      setNewArticles(articles);
    } catch (error) {
      console.error('Error saving new articles:', error);
    }
  };

  const createNewArticle = async (article) => {
    const updatedArticles = [...newArticles, article];
    await saveNewArticles(updatedArticles);
  };

  const unlockNextLevel = (currentLevelId) => {
    const updatedGameData = gameData.map(level => {
      if (level.id === `c${parseInt(currentLevelId.slice(1)) + 1}`) {
        return { ...level, isLocked: false };
      }
      return level;
    });
    saveGameData(updatedGameData);
  };

  const calculateTotalScores = () => {
    let easyTotal = 0;
    let hardTotal = 0;
    gameData.forEach(level => {
      easyTotal += parseInt(level.quizScore.easy);
      hardTotal += parseInt(level.quizScore.hard);
    });
    return { easyTotal, hardTotal };
  };

  const saveTotalScores = async () => {
    const { easyTotal, hardTotal } = calculateTotalScores();
    try {
      await AsyncStorage.setItem('totalScores', JSON.stringify({ easyTotal, hardTotal }));
    } catch (error) {
      console.error('Error saving total scores:', error);
    }
  };

  const saveScore = async (levelId, difficulty, score) => {
    try {
      const updatedGameData = gameData.map(level => {
        if (level.id === levelId) {
          return {
            ...level,
            quizScore: {
              ...level.quizScore,
              [difficulty]: Math.max(parseInt(level.quizScore[difficulty]), score).toString()
            }
          };
        }
        return level;
      });
      
      await saveGameData(updatedGameData);
      await saveTotalScores();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };
  const unlockNextLevelWithHardScore = (currentLevelId) => {
    if (canUnlockNextLevelWithHardScore(currentLevelId)) {
      const updatedGameData = gameData.map(level => {
        if (level.id === `c${parseInt(currentLevelId.slice(1)) + 1}`) {
          return { ...level, isLocked: false };
        }
        return level;
      });
      
      // Deduct 16 points from the total hard score
      const { hardTotal } = calculateTotalScores();
      const remainingHardScore = hardTotal - 22;
      
      // Distribute the remaining score back to the levels
      let remainingToDistribute = remainingHardScore;
      updatedGameData.forEach(level => {
        if (remainingToDistribute > 0) {
          const currentScore = parseInt(level.quizScore.hard);
          const scoreToAdd = Math.min(currentScore, remainingToDistribute);
          level.quizScore.hard = scoreToAdd.toString();
          remainingToDistribute -= scoreToAdd;
        } else {
          level.quizScore.hard = '0';
        }
      });

      saveGameData(updatedGameData);
    }
  };

  const canUnlockNextLevelWithHardScore = (currentLevelId) => {
    const { hardTotal } = calculateTotalScores();
    const nextLevelId = `c${parseInt(currentLevelId.slice(1)) + 1}`;
    const nextLevel = gameData.find(level => level.id === nextLevelId);
    return hardTotal >= 22 && nextLevel && nextLevel.isLocked;
  };

  const deleteArticle = async (articleToDelete) => {
    const updatedArticles = newArticles.filter(article => article !== articleToDelete);
    await saveNewArticles(updatedArticles);
  };

  const resetGameData = async () => {
    try {
      await AsyncStorage.removeItem('gameData');
      setGameData(GameData);
      await AsyncStorage.setItem('gameData', JSON.stringify(GameData));
    } catch (error) {
      console.error('Error resetting game data:', error);
    }
  };

  const value = {
    gameData,
    setGameData: saveGameData,
    currentLevel,
    setCurrentLevel,
    unlockNextLevel,
    saveScore,
    isLoading,
    calculateTotalScores,
    canUnlockNextLevelWithHardScore,  // Add this line
    unlockNextLevelWithHardScore,     // Add this line
    newArticles, // Add this line
    createNewArticle, // Add this line
    deleteArticle, // Add this line
    resetGameData, // Add this line
  };

  if (isLoading) {
    // You might want to return a loading indicator here
    return null;
  }

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const historyContext = useContext(HistoryContext);
  if (!historyContext) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  return historyContext;
};
