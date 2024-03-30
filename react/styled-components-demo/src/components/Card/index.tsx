import CardContainer from './CardContainer'

interface Props {
  readonly item: {
    readonly id: number
    readonly title: string
    readonly body: string
    readonly image: string
  }
}

/**
 * Renders a card component with the provided item data.
 * @param {Props} props The props object containing the item data.
 * @param {Item} props.item The item data to be displayed in the card.
 * @param {number} props.item.id The unique identifier of the item.
 * @param {string} props.item.title The title of the item.
 * @param {string} props.item.body The body content of the item.
 * @param {string} props.item.image The image URL of the item.
 * @returns {JSX.Element} The rendered card component.
 */
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
