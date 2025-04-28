"use strict";

import { LinkedList } from "./linked-list.js";

export function HashMap() {
  let capacity = 16; //bucket size
  let loadFactor = 0.75;
  let size = 0;
  let buckets = new Array(capacity);
  let growNow = () => size / capacity > loadFactor;
  function err(index) {
    if (index < 0 || index >= buckets.length || !buckets[index]) {
      throw new Error("Trying to access index out of bounds");
    }
  }
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function length() {
    return size;
  }

  function set(key, value) {
    const index = hash(key);
    if (!buckets[index]) {
      const newList = new LinkedList();
      buckets[index] = newList;
    }
    if (buckets[index].addOrUpdate(key, value) === "add") {
      size++;
    }
    if (growNow()) {
      grow();
    }
  }

  function get(key) {
    let index = hash(key);
    err(index);
    return buckets[index] ? buckets[index].valueOf(key) : null;
  }
  function has(key) {
    let index = hash(key);
    err(index);
    return buckets[index] ? true : false;
  }

  function remove(key) {
    if (buckets.length === 0) return false;
    let index = hash(key);
    let bucket = buckets[index];
    if (!bucket) return false;
    let position = bucket.findKey(key);
    if (position !== -1) {
      bucket.removeAt(position);
      size--;
      return true;
    }
    return false;
  }

  function clear() {
    buckets = new Array(16);
    capacity = 16;
    size = 0;
    return "hash map cleared";
  }

  function keys() {
    if (buckets.length === 0) return null;
    let arr = [];
    for (let bucket of buckets) {
      if (!bucket) continue;
      arr.push(bucket.allKeys());
    }
    return arr.flat();
  }

  function values() {
    if (buckets.length === 0) return null;
    let arr = [];
    for (let bucket of buckets) {
      if (!bucket) continue;
      arr.push(bucket.allValues());
    }
    return arr.flat();
  }

  function entries() {
    if (buckets.length === 0) return null;
    let arr = [];
    for (let bucket of buckets) {
      if (!bucket) continue;
      arr.push(bucket.pairs());
    }
    return arr.flat();
  }

  function getCapacity() {
    return capacity;
  }

  function getBuckets() {
    return buckets;
  }

  function grow() {
    let temp = entries();
    capacity *= 2;
    size = 0;
    buckets = new Array(capacity);
    for (let [key, value] of temp) {
      set(key, value);
    }
    return buckets;
  }
  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    getCapacity,
    getBuckets,
  };
}
