import CardContainer from './CardContainer'

interface Props {
  readonly item: {
    readonly id: number
    readonly title: string
    readonly body: string
    readonly image: string
  }
}

export default function Card({ item: { id, title, body, image } }: Props) {
  return (
    <CardContainer layout={id % 2 === 0 ? 'row-reverse' : ''}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div>
        <img src={`./images/${image}`} alt="" />
      </div>
    </CardContainer>
  )
}
