import React from 'react';
import paths from './paths';
import './tunisia.css';

export default class Tunisia extends React.Component {

    render() {
        let p = paths()
        
        return (<svg viewBox="0 0 500 650">
            <g>
                {
                    p.map((item, index) => {
                        return (<path key={index} className={item.class} id={item.id} title={item.title} d={item.d} onClick={this.props.handler} />)
                    })
                }
            </g>
        </svg>)
    }
}