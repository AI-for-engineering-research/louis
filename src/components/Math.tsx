import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './Math.css'

type Props = {
  children: string
  block?: boolean
  align?: 'center' | 'left'
}

export default function Math({ children, block = false, align = 'center' }: Props) {
  const html = useMemo(
    () =>
      katex.renderToString(children, {
        displayMode: block,
        throwOnError: false,
      }),
    [children, block],
  )

  if (!block) return <span dangerouslySetInnerHTML={{ __html: html }} />

  return (
    <div
      className={align === 'left' ? 'katex-block katex-left' : 'katex-block'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
