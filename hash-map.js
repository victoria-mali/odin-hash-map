class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = Array.from(new Array(this.capacity), () => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);

    let length = this.length();
    if (length > this.loadFactor * this.capacity) {
      this.grow();
    }
  }

  get(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return undefined;
  }

  has(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let sum = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      sum += this.buckets[i].length;
    }
    return sum;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array.from(new Array(this.capacity), () => []);
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        keys.push(this.buckets[i][j][0]);
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        values.push(this.buckets[i][j][1]);
      }
    }
    return values;
  }

  entries() {
    let array = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        array.push(this.buckets[i][j]);
      }
    }
    return array;
  }

  grow() {
    let entries = this.entries();
    this.capacity *= 2;
    this.buckets = Array.from(new Array(this.capacity), () => []);

    for (let i = 0; i < entries.length; i++) {
      this.set(entries[i][0], entries[i][1]);
    }
  }
}


class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = Array.from(new Array(this.capacity), () => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        return;
      }
    }
    bucket.push(key);

    let length = this.length();
    if (length > this.loadFactor * this.capacity) {
      this.grow();
    }
  }

  has(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let sum = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      sum += this.buckets[i].length;
    }
    return sum;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array.from(new Array(this.capacity), () => []);
  }

  entries() {
    let array = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        array.push(this.buckets[i][j]);
      }
    }
    return array;
  }

  grow() {
    let entries = this.entries();
    this.capacity *= 2;
    this.buckets = Array.from(new Array(this.capacity), () => []);

    for (let i = 0; i < entries.length; i++) {
      this.set(entries[i]);
    }
  }
}


