/**
 * REACT STATE CHEAT SHEET — ARRAYS & OBJECTS (IMMUTABLE PATTERNS)
 *
 * Rule: NEVER mutate state directly.
 * Always return a NEW array/object using spread, map, filter, etc.
 *
 * Mental model:
 * - filter → remove
 * - map → update
 * - spread (...) → copy
 */

import { useState } from "react";

/* =========================
   🟦 INITIAL STATE SETUP
========================= */

const [items, setItems] = useState([
  { id: 1, name: "Item 1", price: 10 },
  { id: 2, name: "Item 2", price: 20 },
]);

const [user, setUser] = useState({
  name: "John Doe",
  age: 24,
  address: {
    city: "Sample City",
    zip: "000000",
  },
});

/* =========================
   🔁 ARRAY OPERATIONS
========================= */

/* ➕ ADD ONE ITEM */
setItems(prev => [
  ...prev,
  { id: 3, name: "Item 3", price: 30 },
]);

/* ➕➕ ADD MULTIPLE ITEMS */
setItems(prev => [
  ...prev,
  ...[
    { id: 4, name: "Item 4", price: 40 },
    { id: 5, name: "Item 5", price: 50 },
  ],
]);

/* ❌ REMOVE ITEM (by id) */
setItems(prev =>
  prev.filter(item => item.id !== 2)
);

/* ❌ REMOVE MULTIPLE ITEMS */
const idsToRemove = [1, 3];
setItems(prev =>
  prev.filter(item => !idsToRemove.includes(item.id))
);

/* 🔁 UPDATE ONE ITEM */
setItems(prev =>
  prev.map(item =>
    item.id === 2
      ? { ...item, price: 99 }
      : item
  )
);

/* 🔁 UPDATE MULTIPLE ITEMS (condition-based) */
setItems(prev =>
  prev.map(item =>
    item.price < 30
      ? { ...item, price: item.price + 10 }
      : item
  )
);

/* 🔄 REPLACE ENTIRE ARRAY */
setItems([
  { id: 100, name: "New Item", price: 999 },
]);

/* 🧹 CLEAR ARRAY */
setItems([]);

/* 🔀 TOGGLE VALUE INSIDE ARRAY */
setItems(prev =>
  prev.map(item =>
    item.id === 1
      ? { ...item, active: !item.active }
      : item
  )
);

/* 🔍 FIND INDEX + UPDATE (rare but useful) */
setItems(prev => {
  const index = prev.findIndex(i => i.id === 2);
  if (index === -1) return prev;

  const updated = [...prev];
  updated[index] = { ...updated[index], price: 999 };
  return updated;
});

/* 📦 INSERT AT SPECIFIC POSITION */
setItems(prev => {
  const newItem = { id: 6, name: "Inserted", price: 60 };
  return [
    ...prev.slice(0, 1),
    newItem,
    ...prev.slice(1),
  ];
});

/* 🔃 SORT ARRAY */
setItems(prev =>
  [...prev].sort((a, b) => a.price - b.price)
);

/* 🔄 REVERSE ARRAY */
setItems(prev =>
  [...prev].reverse()
);

/* =========================
   🟩 OBJECT OPERATIONS
========================= */

/* ✏️ UPDATE SINGLE FIELD */
setUser(prev => ({
  ...prev,
  name: "New Name",
}));

/* ✏️ UPDATE MULTIPLE FIELDS */
setUser(prev => ({
  ...prev,
  name: "Ankit Sharma",
  age: 25,
}));

/* 🧠 UPDATE NESTED OBJECT */
setUser(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: "Mumbai",
  },
}));

/* ❌ REMOVE FIELD FROM OBJECT */
setUser(prev => {
  const { age, ...rest } = prev;
  return rest;
});

/* 🔁 TOGGLE BOOLEAN */
setUser(prev => ({
  ...prev,
  isActive: !prev.isActive,
}));

/* =========================
   ⚠️ COMMON MISTAKES (DON’T DO THIS)
========================= */

// ❌ Direct mutation
items.push({ id: 10 }); // WRONG

// ❌ Direct update
items[0].price = 999; // WRONG

// ❌ Mutating object
user.name = "Hacked"; // WRONG

/* =========================
   🧠 PRO TIP (IMPORTANT)
========================= */

/*
 * Always use functional updates when new state depends on old state:
 *
 * setState(prev => ...)
 *
 * This avoids stale state bugs (very common in async updates).
 */