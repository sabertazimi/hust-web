import React from 'react';
import NavLink from './NavLink';

export default React.createClass({
  render() {
    return (
        <div>
            <h1>React Router</ h1>
            <ul role="nav">
                <li><NavLink to="/" onlyActiveOnIndex={ true }>Home</ NavLink></ li>
                <li><NavLink to="/repos">Repos</ NavLink></ li>
                <li><NavLink to="/about">About</ NavLink></ li>
            </ ul>
            {this.props.children}
        </ div>
    );
  }
})
