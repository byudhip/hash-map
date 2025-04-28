"use strict";

// Node class representing an element in the linked list
class Node {
  constructor(key, value) {
    (this.key = key), (this.value = value);
    this.next = null;
  }
}

// LinkedList class managing nodes
class LinkedList {
  constructor() {
    this.HEAD = null; // First node in the list
    this.TAIL = null; // Last node in the list
    this.SIZE = 0; // Number of nodes in the list
  }
  // Add node to the end of the list
  append(key, value) {
    let newNode = new Node(key, value);
    if (!this.HEAD) {
      // If list is empty, HEAD and TAIL both point to new node
      this.HEAD = newNode;
      this.TAIL = newNode;
    } else {
      // Otherwise, append to end and update TAIL
      this.TAIL.next = newNode;
      this.TAIL = newNode;
    }
    this.SIZE++;
    return this;
  }
  // Add node to the start of the list
  prepend(key, value) {
    let newNode = new Node(key, value);
    if (!this.HEAD) {
      // If list is empty, HEAD and TAIL both point to new node
      this.HEAD = newNode;
      this.TAIL = newNode;
      this.SIZE++;
    } else {
      // Otherwise, insert before current HEAD
      newNode.next = this.HEAD;
      this.HEAD = newNode;
    }
    this.SIZE++;
    return this;
  }
  // Return number of elements in list
  size() {
    return this.SIZE;
  }
  // Return HEAD node or null
  head() {
    return this.HEAD ? this.HEAD : null;
  }
  // Return TAIL node or null
  tail() {
    return this.TAIL ? this.TAIL : null;
  }
  // Return node at specified index
  at(index) {
    if (index < 0) return null;
    if (index === this.SIZE) return null;
    let count = 0;
    let node = this.HEAD;
    while (node) {
      if (count === index) return node;
      node = node.next;
      count++;
    }
    return null;
  }

  valueOf(key) {
    let node = this.HEAD;
    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return null;
  }

  // Remove and return the last node in the list
  pop() {
    if (!this.HEAD) return null;
    if (!this.HEAD.next) {
      let removed = this.HEAD;
      this.HEAD = null;
      this.TAIL = null;
      this.SIZE--;
      return removed;
    }
    let secondLast = this.at(this.SIZE - 2);
    secondLast.next = null;
    let removed = this.TAIL;
    this.TAIL = secondLast;
    this.SIZE--;
    return removed;
  }
  // Check if a value exists in the list
  contains(value) {
    let node = this.HEAD;
    while (node) {
      if (node.value === value) return true;
      node = node.next;
    }
    return false;
  }
  // Find index of the node with specified value
  find(value) {
    let node = this.HEAD;
    let count = 0;
    while (node) {
      if (node.value === value) {
        return count;
      }
      node = node.next;
      count++;
    }
    return null;
  }
  findKey(key) {
    let node = this.HEAD;
    let count = 0;
    while (node) {
      if (node.key === key) {
        return count;
      }
      node = node.next;
      count++;
    }
    return null;
  }
  addOrUpdate(key, value) {
    let node = this.HEAD;
    while (node) {
      if (node.key === key) {
        node.value = value;
        return "update";
      }
      node = node.next;
    }
    this.append(key, value);
    return "add";
  }

  // Return string representation of the list
  toStr() {
    let node = this.HEAD;
    let valueStr = "";
    while (node) {
      valueStr += `( ${node.value} ) -> `;
      node = node.next;
    }
    return (valueStr += "null");
  }
  // Insert node with value at specified index
  insertAt(key, value, index) {
    let nodeShiftedRight = this.at(index);
    let newNode = new Node(key, value);
    if (index < 0) return this;
    if (index > this.SIZE) return `Out of list bounds`;
    if (index === 0) {
      // Insert at the beginning
      this.prepend(key, value);
      return this;
    }
    if (index === this.SIZE) {
      // Insert at the end
      this.append(key, value);
      return this;
    }
    // Insert in the middle
    this.at(index - 1).next = newNode;
    newNode.next = nodeShiftedRight;
    this.SIZE++;
    return this;
  }
  // Remove node at specified index
  removeAt(index) {
    if (index < 0 || index >= this.SIZE) return null;
    if (index === 0) {
      // Remove head node
      this.HEAD = this.HEAD.next;
      this.SIZE--;
      if (this.SIZE === 0) this.TAIL = null;
      return this;
    }
    // Remove node in middle or end
    const prevNode = this.at(index - 1);
    const nodeToRemove = prevNode.next;
    prevNode.next = nodeToRemove.next;
    if (index === this.SIZE - 1) this.TAIL = prevNode;
    this.SIZE--;
    return this;
  }
  getKeyCount() {
    let count = 0;
    let current = this.HEAD;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  allKeys() {
    let current = this.HEAD;
    let arr = [];
    while (current) {
      arr.push(current.key);
      current = current.next;
    }
    return arr;
  }

  allValues() {
    let current = this.HEAD;
    let arr = [];
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  pairs() {
    let current = this.HEAD;
    let arr = [];
    while (current) {
      arr.push([current.key, current.value]);
      current = current.next;
    }
    return arr;
  }
}

export { Node, LinkedList };
