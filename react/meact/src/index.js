import Meact from './meact.js'
import './index.css'

const stories = [
  {
    name: 'Didact introduction',
    url: 'http://bit.ly/2pX7HNn',
  },
  {
    name: 'Rendering DOM elements ',
    url: 'http://bit.ly/2qCOejH',
  },
  {
    name: 'Element creation and JSX',
    url: 'http://bit.ly/2qGbw8S',
  },
  {
    name: 'Instances and reconciliation',
    url: 'http://bit.ly/2q4A746',
  },
  {
    name: 'Components and state',
    url: 'http://bit.ly/2rE16nh',
  },
]

class App extends Meact.Component {
  render() {
    return (
      <div>
        <h1>Didact Stories</h1>
        <ul>
          {this.props.stories.map((story) => {
            return <Story name={story.name} url={story.url} key={story.url} />
          })}
        </ul>
      </div>
    )
  }
}

class Story extends Meact.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: Math.ceil(Math.random() * 100),
    }
  }

  like() {
    this.setState(({ likes }) => ({ likes: likes + 1 }))
  }

  render() {
    const { name, url } = this.props
    const { likes } = this.state
    return (
      <li>
        <button onClick={() => this.like()} type="button">
          {likes}
          <b>❤️</b>
        </button>
        <a href={url}>{name}</a>
      </li>
    )
  }
}

Meact.render(<App stories={stories} />, document.getElementById('root'))
