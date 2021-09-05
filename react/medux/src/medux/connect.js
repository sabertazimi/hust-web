import React from 'react';

export const Provider = ({
    store,
    children
}) => {
    const StoreContext = React.createContext(store);

    return (
        <StoreContext.Provider value={store}>
            <StoreContext.Consumer>
                {(store) => {
                    const childrenWithStore = React.Children.map(children, child =>
                        React.cloneElement(child, { store: store }));

                    return <div>{childrenWithStore}</div>
                }}
            </StoreContext.Consumer>
        </StoreContext.Provider>
    );
};

export const connect = (
    mapStateToProps = () => ({}),
    mapDispatchToProps = () => ({})
) => Component => {
    class Connected extends React.Component {
        onStoreOrPropsChange(props) {
            const { store } = this.props;
            const state = store.getState();
            const stateProps = mapStateToProps(state, props);
            const dispatchProps = mapDispatchToProps(store.dispatch, props);
            this.setState({
                ...stateProps,
                ...dispatchProps
            });
        }

        componentWillMount() {
            const { store } = this.props;
            this.onStoreOrPropsChange(this.props);
            this.unsubscribe = store.subscribe(() => this.onStoreOrPropsChange(this.props));
        }

        componentWillReceiveProps(nextProps) {
            this.onStoreOrPropsChange(nextProps);
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            return <Component {...this.props} {...this.state} />;
        }
    }

    return Connected;
};