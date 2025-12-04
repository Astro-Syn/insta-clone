import React, { useState } from 'react';
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import { characters } from '../../data/characters';

type User = {
  id: string;
  username: string;
  uid: string;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const characterList: User[] = Object.values(characters).map((char: any) => ({
    id: char.uid, 
    uid: char.uid,
    username: char.username
  }))

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }
   
    const filteredCharacters = characterList.filter((char) =>
    char.username.toLowerCase().startsWith(value.toLowerCase())
  );

    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      orderBy("username"),
      startAt(value),
      endAt(value + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const users: User[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));

      const firebaseUsers: User[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as User),
  }));

     const combinedResults = [...filteredCharacters, ...firebaseUsers];

    setResults(combinedResults);
    setShowDropdown(true);
  };

  

  const selectUser = (user: User) => {
    setSearchTerm(user.username);
    setShowDropdown(false);
    navigate(`/profile/${user.uid}`);
  };

  return (
    <div className="search-container">
      <div className="search-title-container">
        <p>Search for user</p>
      </div>

      <div className="search-area">
        <div className='search-area-wrapper'>

          <input
          className="search-bar"
          type="text"
          value={searchTerm}
          placeholder="SEARCH..."
          onChange={handleSearch}
          onFocus={() => searchTerm && results.length > 0 && setShowDropdown(true)}
        />


        {showDropdown && (
          <div className="dropdown">

        {results.length > 0 ? (
          results.map((user) => (
            <div
            key={user.id}
            className="dropdown-item"
            onClick={() => selectUser(user)}
            >
          {user.username}
        </div>
      ))
    ) : (
      <div className="dropdown-item no-results">
        No search results found
      </div>
    )}
    

    </div>
)}

        </div>
        
      


    </div>
    </div>
  );
}
