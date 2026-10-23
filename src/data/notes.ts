import type { Note } from "../types/note";

export const initialNotes : Note[] =[
  {
    id:'1',
    title: 'React + TypeScript',
    content: '# React + Typescript \n\n Learn components, props, and state.',
    updatedAt: '2026-10-22',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Project Ideas',
    content: '#Project Ideas \n\n -MarkDown notes editor\n -Personal Dashboard',
    updatedAt: '2026-10-21',
    isFavorite: false,
  },
    {
    id: '3',
    title: 'Learning Goals',
    content: '# Learning Goals\n\nPractice TypeScript and build useful projects.',
    updatedAt: '2026-10-20',
    isFavorite: false,
  },
];

