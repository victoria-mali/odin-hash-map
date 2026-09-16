# JavaScript HashMap & HashSet

An implementation of a hash map and hash set data structure from scratch in JavaScript, built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Overview

This project implements the core mechanics of a hash map without relying on JavaScript's built-in `Map` or `Object` — including hashing, collision handling, dynamic resizing, and full CRUD-style operations.

## Features

- **Custom hash function** — converts string keys into bucket indices using a prime-multiplier algorithm, with modulo applied on every iteration to avoid integer overflow on long keys.
- **Collision handling** — each bucket stores an array of `[key, value]` pairs, so multiple keys hashing to the same index coexist without overwriting each other.
- **Dynamic resizing** — buckets automatically double in capacity once the load factor (0.75) is reached, and existing entries are rehashed into the new bucket layout.
- **Full method set** on `HashMap`:
  - `set(key, value)`
  - `get(key)`
  - `has(key)`
  - `remove(key)`
  - `length()`
  - `clear()`
  - `keys()`
  - `values()`
  - `entries()`
- **`HashSet`** — a companion class with the same underlying bucket/hash/resize logic, storing unique keys only (no values).

## How it works

- Each `HashMap` instance holds a `buckets` array (initial capacity: 16), where every slot is an independent array used to store colliding entries.
- `hash(key)` walks through each character of the key, combining it with a prime multiplier (31) and reducing it modulo the current capacity at every step — keeping the running hash code small and avoiding precision loss on long keys.
- On `set()`, the key is hashed to find its bucket, then the bucket is scanned for an existing match: a match updates the value in place, while no match appends a new pair. After insertion, if the total entry count exceeds `loadFactor * capacity`, `grow()` doubles the capacity and reinserts every existing entry into the freshly sized bucket array.

## Usage

```javascript
const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');

test.get('apple');     // 'red'
test.has('banana');    // true
test.remove('carrot'); // true
test.length();         // 2
test.keys();           // ['apple', 'banana']
test.values();         // ['red', 'yellow']
test.entries();        // [['apple', 'red'], ['banana', 'yellow']]
```

`HashSet` works the same way, minus the value:

```javascript
const set = new HashSet();

set.set('apple');
set.has('apple'); // true
set.remove('apple'); // true
```

## What I learned

- How hash functions turn arbitrary strings into array-safe indices, and why a prime multiplier improves distribution.
- Why modulo needs to be applied *inside* the hashing loop rather than once at the end, to avoid exceeding `Number.MAX_SAFE_INTEGER` on long keys.
- How to handle collisions using per-bucket arrays instead of overwriting data.
- How dynamic resizing works under the hood — rehashing every existing entry against a new capacity rather than just relocating raw data.

## Technologies

- Vanilla JavaScript (ES6 classes)

## Acknowledgments

Built as part of [The Odin Project](https://www.theodinproject.com/)'s Full Stack JavaScript curriculum.