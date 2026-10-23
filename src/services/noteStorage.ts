import type {Note} from "../types/note";
import { initialNotes } from "../data/notes";

const STORAGE_KEY = "notecraft-notes";

export const loadNotes = (): Note[] => {
  try{
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if(storedNotes===null){
      saveNotes(initialNotes);
      return initialNotes;
    }
    const parsedNotes: unknown= JSON.parse(storedNotes);
    if(!Array.isArray(parsedNotes)){
      return initialNotes;
    }
    return parsedNotes as Note[];
  }catch(error){
    console.error("Failed to load notes: ", error);
    return initialNotes;
  }
}

export const saveNotes = (note: Note[]) : void => {
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(note));
  }catch(error){
    console.error("Failed to save notes: ", error);
  }
}