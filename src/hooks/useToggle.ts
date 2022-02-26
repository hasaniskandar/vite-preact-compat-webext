export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggleValue = () => setValue((currentValue) => !currentValue)

  return [value, toggleValue] as const
}
