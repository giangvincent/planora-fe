import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth } from '../firebase';

export const authApi = {
  login: (credentials: any) => signInWithEmailAndPassword(auth, credentials.email, credentials.password),
  register: (data: any) => createUserWithEmailAndPassword(auth, data.email, data.password),
  logout: () => signOut(auth),
  getCurrentUser: () => auth.currentUser,
  onAuthStateChanged: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback),
};
