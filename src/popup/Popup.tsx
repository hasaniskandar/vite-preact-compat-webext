import Logo from '~/components/Logo'
import { useStorageLocal } from '~/hooks/useStorageLocal'

const openOptionsPage = () => {
  browser.runtime.openOptionsPage()
}

export default function Popup() {
  const [storageDemo] = useStorageLocal<string>('webext-demo', 'Storage Demo')

  return (
    <main className="text-center py-5 px-4 text-gray-700 w-[300px]">
      <Logo />
      <div>Popup</div>
      <p className="mt-2 opacity-50">This is the popup page</p>

      <button className="mt-2 btn" onClick={openOptionsPage}>
        Open Options
      </button>

      <div className="mt-2">
        <span className="opacity-50">Storage:</span> {storageDemo}
      </div>
    </main>
  )
}
