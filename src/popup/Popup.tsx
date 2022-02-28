import Logo from '~/components/Logo'
import { useStorageLocal } from '~/hooks/useStorageLocal'

const openOptionsPage = () => {
  browser.runtime.openOptionsPage()
}

export default function Popup() {
  const [storageDemo] = useStorageLocal<string>('webext-demo', 'Storage Demo')

  return (
    <main className="w-[300px] py-5 px-4 text-center text-gray-700">
      <Logo />
      <div>Popup</div>
      <p className="mt-2 opacity-50">This is the popup page</p>

      <button className="btn mt-2" onClick={openOptionsPage}>
        Open Options
      </button>

      <div className="mt-2">
        <span className="opacity-50">Storage:</span> {storageDemo}
      </div>
    </main>
  )
}
