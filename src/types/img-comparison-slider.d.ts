import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ImgComparisonSliderProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  value?: string | number
  hover?: string | boolean
  direction?: 'horizontal' | 'vertical'
  keyboard?: 'enabled' | 'disabled'
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'img-comparison-slider': ImgComparisonSliderProps
    }
  }
}
