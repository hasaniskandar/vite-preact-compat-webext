import { useToggle } from '~/hooks/useToggle'
import IconPower from '~icons/pixelarticons/power'

export default function App() {
  const [isTextShown, toggleIsTextShown] = useToggle(false)

  return (
    <div className="fixed right-0 bottom-0 z-[100] m-5 flex select-none font-sans leading-[1em]">
      <div
        className={`my-auto mr-2 h-min w-max rounded-full bg-white p-4 py-2 text-gray-800 shadow transition-opacity duration-300 ${
          isTextShown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Vitesse WebExt
      </div>
      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer rounded-full border-none bg-teal-600 shadow hover:bg-teal-700"
        onClick={() => toggleIsTextShown()}
      >
        <IconPower className="m-auto block text-lg text-white" />
      </button>
    </div>
  )
}
