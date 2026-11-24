"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

// live list of documents; null while loading
export function useCollection(name, field = "createdAt") {
  const [items, setItems] = useState(null);
  useEffect(() => onSnapshot(
    query(collection(db, name), orderBy(field, "desc")),
    (s) => setItems(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (e) => { console.error(e); setItems([]); }
  ), [name, field]);
  return items;
}
