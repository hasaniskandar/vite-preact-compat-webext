export type Awaitable<T> = Promise<T> | T

export interface SerializerAsync<T> {
  read(raw: string): Awaitable<T>
  write(value: T): Awaitable<string>
}

export interface StorageLikeAsync {
  getItem(key: string): Awaitable<string | null>
  setItem(key: string, value: string): Awaitable<void>
  removeItem(key: string): Awaitable<void>
}

export interface StorageAsyncOptions<T> {
  writeDefaults?: boolean
  listenToStorageChanges?: boolean
  serializer?: SerializerAsync<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => void
}

export function guessSerializerType<
  T extends string | number | boolean | Record<string, unknown> | null
>(initialValue: T) {
  return initialValue == null
    ? 'any'
    : initialValue instanceof Set
    ? 'set'
    : initialValue instanceof Map
    ? 'map'
    : typeof initialValue === 'boolean'
    ? 'boolean'
    : typeof initialValue === 'string'
    ? 'string'
    : typeof initialValue === 'object'
    ? 'object'
    : Array.isArray(initialValue)
    ? 'object'
    : !Number.isNaN(initialValue)
    ? 'number'
    : 'any'
}

export const StorageSerializers: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any: SerializerAsync<any>
  boolean: SerializerAsync<boolean>
  map: SerializerAsync<Map<unknown, unknown>>
  number: SerializerAsync<number>
  object: SerializerAsync<Record<string, unknown>>
  set: SerializerAsync<Set<unknown>>
  string: SerializerAsync<string>
} = {
  any: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    read: (v: any) => v,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    write: (v: any) => String(v),
  },
  boolean: {
    read: (v: string) => v === 'true',
    write: (v: boolean) => String(v),
  },
  map: {
    read: (v: string) => new Map(JSON.parse(v)),
    write: (v: Map<unknown, unknown>) =>
      JSON.stringify(Array.from(v.entries())),
  },
  number: {
    read: (v: string) => Number.parseFloat(v),
    write: (v: number) => String(v),
  },
  object: {
    read: (v: string) => JSON.parse(v),
    write: (v: Record<string, unknown>) => JSON.stringify(v),
  },
  set: {
    read: (v: string) => new Set(JSON.parse(v)),
    write: (v: Set<unknown>) => JSON.stringify(Array.from(v).entries()),
  },
  string: {
    read: (v: string) => v,
    write: (v: string) => String(v),
  },
}

// Shamefully borrowed from https://vueuse.org/core/usestorageasync
export function useStorageAsync<
  T extends string | number | boolean | Record<string, unknown> | null
>(
  key: string,
  initialValue: T,
  storage: StorageLikeAsync | undefined = window.localStorage,
  options: StorageAsyncOptions<T> = {}
) {
  const [value, setValue] = useState(initialValue)
  const {
    writeDefaults = true,
    listenToStorageChanges = true,
    onError = (error) => console.error(error),
  } = options
  const type = guessSerializerType<T>(initialValue)
  const serializer = options.serializer ?? StorageSerializers[type]

  // Read storage
  useEffect(() => {
    const read = async (event?: StorageEvent) => {
      if (!storage || (event && event.key !== key)) return

      try {
        const rawValue = event ? event.newValue : await storage.getItem(key)
        if (rawValue == null) {
          setValue(initialValue)
          if (writeDefaults && initialValue !== null) {
            await storage.setItem(key, await serializer.write(initialValue))
          }
        } else {
          setValue(await serializer.read(rawValue))
        }
      } catch (error) {
        onError(error)
      }
    }
    read()

    if (!window || !listenToStorageChanges) return

    const listener = (event: StorageEvent) => setTimeout(() => read(event), 0)
    const cleanup = () => window.removeEventListener('storage', listener)
    window.addEventListener('storage', listener)
    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update storage
  useEffect(() => {
    if (!storage) return
    ;(async () => {
      try {
        if (value == null) {
          await storage.removeItem(key)
        } else {
          await storage.setItem(key, await serializer.write(value))
        }
      } catch (error) {
        onError(error)
      }
    })()
  }, [key, value, storage, serializer, onError])

  const setItem = async (newValue: T) => {
    try {
      setValue(newValue)
      await storage.setItem(key, await serializer.write(newValue))
    } catch (error) {
      onError(error)
    }
  }

  return [value, setItem] as const
}
