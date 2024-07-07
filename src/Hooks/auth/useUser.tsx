import React, { ReactNode, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";

interface UserContextType {
  user: FirebaseUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  Loading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const signinUser = await signInWithEmailAndPassword(auth, email, password);
    setUser(signinUser.user);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    setUser(userCredential.user);
  };

  const logOut = () => {
    setUser(null);
    return signOut(auth);
  };

  const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    const signinUser = await signInWithPopup(auth, googleAuthProvider);
    setUser(signinUser.user);
  };

  return (
    <UserContext.Provider
      value={{ user, signIn, signUp, logOut, googleSignIn, Loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
