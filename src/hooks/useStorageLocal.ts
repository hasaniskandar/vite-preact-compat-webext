import { storage } from 'webextension-polyfill'
import {
  StorageAsyncOptions,
  StorageLikeAsync,
  useStorageAsync,
} from './useStorageAsync'

const storageLocal: StorageLikeAsync = {
  removeItem(key: string) {
    return storage.local.remove(key)
  },

  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value })
  },

  async getItem(key: string) {
    return (await storage.local.get(key))[key]
  },
}

export function useStorageLocal<
  T extends string | number | boolean | Record<string, unknown> | null
>(key: string, initialValue: T, options: StorageAsyncOptions<T> = {}) {
  return useStorageAsync(key, initialValue, storageLocal, options)
}
