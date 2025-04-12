import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../services/firebase';

// Constants
const MODULES_COLLECTION = 'modules';
const USER_PROGRESS_COLLECTION = 'userProgress';

export const initializeUserProgress = async (userId) => {
  try {
    const userProgressRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (!docSnap.exists()) {
      await setDoc(userProgressRef, {
        completedModules: [],
        lastUpdated: new Date().toISOString(),
        totalProgress: 0
      });
    }
  } catch (error) {
    console.error('Error initializing user progress:', error);
    throw error;
  }
};

export const markModuleAsComplete = async (userId, moduleId) => {
  try {
    const userProgressRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const isModuleCompleted = userData.completedModules.includes(moduleId);
      
      if (!isModuleCompleted) {
        const updatedModules = [...userData.completedModules, moduleId];
        const totalModules = 8; // Total number of modules in the course
        const progress = Math.round((updatedModules.length / totalModules) * 100);
        
        await updateDoc(userProgressRef, {
          completedModules: arrayUnion(moduleId),
          totalProgress: progress,
          lastUpdated: new Date().toISOString()
        });
        
        return updatedModules;
      }
      
      return userData.completedModules;
    }
    
    return [];
  } catch (error) {
    console.error('Error marking module as complete:', error);
    throw error;
  }
};

export const getUserProgress = async (userId) => {
  try {
    const userProgressRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    return { completedModules: [], totalProgress: 0 };
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};

export const updateModuleCompletion = async (userId, moduleId, isComplete = true) => {
  try {
    const userProgressRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const totalModules = 8; // Total number of modules in the course
      
      let updatedModules;
      if (isComplete) {
        updatedModules = [...new Set([...userData.completedModules, moduleId])];
      } else {
        updatedModules = userData.completedModules.filter(id => id !== moduleId);
      }
      
      const progress = Math.round((updatedModules.length / totalModules) * 100);
      
      await updateDoc(userProgressRef, {
        completedModules: isComplete ? arrayUnion(moduleId) : arrayRemove(moduleId),
        totalProgress: progress,
        lastUpdated: new Date().toISOString()
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating module completion:', error);
    throw error;
  }
};

export const getModuleProgress = async (userId) => {
  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    return {};
  } catch (error) {
    console.error('Error getting module progress:', error);
    throw error;
  }
}; 