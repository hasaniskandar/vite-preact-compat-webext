import { useStorageLocal } from '~/hooks/useStorageLocal'
import IconSliders from '~icons/pixelarticons/sliders'
import IconZap from '~icons/pixelarticons/zap'

export default function Options() {
  const [storageDemo, setStorageDemo] = useStorageLocal<string>(
    'webext-demo',
    'Storage Demo'
  )

  return (
    <main className="py-10 px-4 text-center text-gray-700 dark:text-gray-200">
      <IconSliders className="icon-btn mx-2 text-2xl" />
      <div>Options</div>
      <p className="mt-2 opacity-50">This is the options page</p>

      <input
        className="mt-2 rounded border border-gray-400 py-1 px-2"
        value={storageDemo}
        onChange={(event) => setStorageDemo(event.target.value)}
      />

      <div className="mt-4">
        Powered by Vite <IconZap className="inline-block align-middle" />
      </div>
    </main>
  )
}
