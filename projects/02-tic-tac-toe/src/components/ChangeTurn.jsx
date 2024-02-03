import { Square } from './Square'

export const ChangeTurn = ({ turn, turns }) => {
  return (
    <section className='turn'>
      <Square isSelected={turn === turns.x}>
        {turns.x}
      </Square>
      <Square isSelected={turn === turns.o}>
        {turns.o}
      </Square>
    </section>
  )
}
