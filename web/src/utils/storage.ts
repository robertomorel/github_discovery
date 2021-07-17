export class Storage {
  /** Gets the value with the given key. */
  static get(key: string): Promise<string | null> {
    const data = localStorage.getItem(key)

    if (!data) return Promise.resolve(null)

    return Promise.resolve(data)
  }

  /** Sets the value for the given key */
  static set(key: string, value: string): Promise<void> {
    return Promise.resolve(localStorage.setItem(key, value))
  }

  /** Removes the value for this key (if any) */
  static remove(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key))
  }

  /** Empties the storage, clearing all keys and values */
  static clear(): Promise<void> {
    return Promise.resolve(localStorage.clear())
  }

  /** Returns the number of key/value pairs currently present */
  static size(): Promise<number> {
    return Promise.resolve(localStorage.length)
  }

  static keys(): Promise<string[]> {
    const keys: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      /* istanbul ignore next */
      if (key) {
        keys.push(key)
      }
    }

    return Promise.resolve(keys)
  }
}
