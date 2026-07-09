import { useState } from 'react'
import 'img-comparison-slider'
import 'img-comparison-slider/dist/styles.css'
import Dropdown from './Dropdown'
import './ImageCompare.css'

export type CompareImage = {
  id: string
  label: string
  src: string
}

type Props = {
  images: CompareImage[]
  defaultLeft?: string
  defaultRight?: string
}

export default function ImageCompare({ images, defaultLeft, defaultRight }: Props) {
  const [leftId, setLeftId] = useState(defaultLeft ?? images[0]?.id)
  const [rightId, setRightId] = useState(defaultRight ?? images[1]?.id ?? images[0]?.id)

  const left = images.find((img) => img.id === leftId) ?? images[0]
  const right = images.find((img) => img.id === rightId) ?? images[0]

  if (!left || !right) return null

  return (
    <div className="img-compare">
      <div className="controls">
        <Dropdown label="Left" value={left.id} options={images} onChange={setLeftId} />
        <Dropdown
          label="Right"
          value={right.id}
          options={images}
          onChange={setRightId}
          align="right"
        />
      </div>

      <img-comparison-slider className="slider-container" value="50">
        <figure slot="first" className="before">
          <img src={left.src} alt={left.label} />
          <figcaption>{left.label}</figcaption>
        </figure>
        <figure slot="second" className="after">
          <img src={right.src} alt={right.label} />
          <figcaption>{right.label}</figcaption>
        </figure>
      </img-comparison-slider>
    </div>
  )
}
