import { useCatImage } from '../hooks/useCatImage'

export function Otro () {
  const { img } = useCatImage({ fact: 'nofuequequise' })

  return (
    <>
      {img && <img src={img} alt='nofuequequise' />}
    </>
  )
}
