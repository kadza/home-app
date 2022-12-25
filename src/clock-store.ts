import { readable } from 'svelte/store'

export default function() {
	const initial = new Date()

  return readable(initial, set => {
    const update = () => set(new Date())

    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  })
}