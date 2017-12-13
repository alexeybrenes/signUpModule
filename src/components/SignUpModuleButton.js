import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan500} from 'material-ui/styles/colors';
import './SignUpModuleButton.css';

export default class SignUpModuleButton extends React.Component {
    handleClick() {
        this.props.onClick();
    }
    render() {
        return (
            <div>
                <RaisedButton
                    className='button'
                    label={this.props.label}
                    labelColor={cyan500}
                    labelPosition='before'
                    onClick={() => this.handleClick()}
                    icon={<img src={this.props.img} alt={this.props.label}/>}
                    style={{height: '50px'}}
                />
            </div>
        );
    }
}