import React from 'react'

export function Provider({ store, children }) {
  const StoreContext = React.createContext(store)

  return (
    <StoreContext.Provider value={store}>
      <StoreContext.Consumer>
        {(store) => {
          // eslint-disable-next-line react/no-children-map -- legacy code
          const childrenWithStore = React.Children.map(children, child =>
            // eslint-disable-next-line react/no-clone-element -- legacy code
            React.cloneElement(child, { store }))

          return <div>{childrenWithStore}</div>
        }}
      </StoreContext.Consumer>
    </StoreContext.Provider>
  )
}

export function connect(mapStateToProps = () => ({}), mapDispatchToProps = () => ({})) {
  return (Component) => {
    class Connected extends React.Component {
      onStoreOrPropsChange(props) {
        const { store } = this.props
        const state = store.getState()
        const stateProps = mapStateToProps(state, props)
        const dispatchProps = mapDispatchToProps(store.dispatch, props)
        this.setState({
          ...stateProps,
          ...dispatchProps,
        })
      }

      // eslint-disable-next-line react/no-unsafe-component-will-mount -- legacy code
      UNSAFE_componentWillMount() {
        const { store } = this.props
        this.onStoreOrPropsChange(this.props)
        this.unsubscribe = store.subscribe(() =>
          this.onStoreOrPropsChange(this.props),
        )
      }

      // eslint-disable-next-line react/no-unsafe-component-will-receive-props -- legacy codee
      UNSAFE_componentWillReceiveProps(nextProps) {
        this.onStoreOrPropsChange(nextProps)
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return <Component {...this.props} {...this.state} />
      }
    }

    return Connected
  }
}
