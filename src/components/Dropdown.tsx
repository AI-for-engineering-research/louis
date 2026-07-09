import { useEffect, useId, useRef, useState } from 'react'
import './Dropdown.css'

export type DropdownOption = { id: string; label: string }

type Props = {
  label: string
  value: string
  options: DropdownOption[]
  onChange: (id: string) => void
  align?: 'left' | 'right'
}

/**
 * A listbox rendered in the page rather than a native <select>. Chrome draws the
 * native popup as an OS widget that can only use installed fonts, so web fonts
 * such as Poppins never reach it.
 */
export default function Dropdown({ label, value, options, onChange, align = 'left' }: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  const selected = options.find((o) => o.id === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    const onDocPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDocPointerDown)
    return () => document.removeEventListener('pointerdown', onDocPointerDown)
  }, [open])

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.id === value)))
    setOpen(true)
  }

  const choose = (index: number) => {
    const option = options[index]
    if (option) onChange(option.id)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'ArrowDown') setActive((i) => Math.min(options.length - 1, i + 1))
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1))
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(options.length - 1)
    else if (e.key === 'Enter' || e.key === ' ') choose(active)
    else if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'Tab') {
      setOpen(false)
      return
    } else return
    e.preventDefault()
  }

  if (!selected) return null

  return (
    <div className={`dropdown ${align}`} ref={rootRef}>
      <span className="dropdown-label" id={`${uid}-label`}>
        {label}
      </span>
      <div className="dropdown-control">
        <button
          type="button"
          className="dropdown-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${uid}-label ${uid}-button`}
          id={`${uid}-button`}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
        >
          <span className="dropdown-value">{selected.label}</span>
          <span className="dropdown-chevron" aria-hidden="true" />
        </button>

        {open && (
          <ul
            className="dropdown-list"
            role="listbox"
            aria-labelledby={`${uid}-label`}
            aria-activedescendant={`${uid}-opt-${active}`}
          >
            {options.map((option, index) => (
              <li
                key={option.id}
                id={`${uid}-opt-${index}`}
                role="option"
                aria-selected={option.id === selected.id}
                className={index === active ? 'active' : undefined}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
