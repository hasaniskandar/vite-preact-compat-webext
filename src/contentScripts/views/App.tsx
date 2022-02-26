import { useToggle } from '~/hooks/useToggle'
import IconPower from '~icons/pixelarticons/power'

export default function App() {
  const [isTextShown, toggleIsTextShown] = useToggle(false)

  return (
    <div className="flex font-sans m-5 right-0 bottom-0 leading-1em z-100 fixed select-none">
      <div
        className={`bg-white text-gray-800 rounded-full shadow w-max h-min p-4 py-2 my-auto mr-2 transition-opacity transition-duration-300 ${
          isTextShown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Vitesse WebExt
      </div>
      <button
        type="button"
        className="border-none rounded-full cursor-pointer flex bg-teal-600 h-10 shadow w-10 hover:bg-teal-700"
        onClick={() => toggleIsTextShown()}
      >
        <IconPower className="m-auto text-white text-lg block" />
      </button>
    </div>
  )
}
