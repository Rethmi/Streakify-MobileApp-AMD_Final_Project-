import { ReactNode } from "react";

export type HabitFrequency = 'daily' | 'weekdays' | 'weekends' | 'weekly';

export interface Habit {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  frequency: HabitFrequency; // Literal type එක භාවිතා කරන්න
  userId: string;
  createdAt: any; // Firestore Timestamp සඳහා
  completions: { [date: string]: boolean };
}

export interface HabitInput {
  title: string;
  description: string;
  time: string;
  icon: string;
  frequency: HabitFrequency;
}