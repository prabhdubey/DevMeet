import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

class TextFieldGroup extends Component {
    render() {
        return (
            <div className="form-group">
                <input
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': this.props.error
                    })}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}
                />
                {this.props.info && (<small className="form-text text-muted">{this.props.info}</small>)}
                {this.props.error && (<div className="invalid-feedback">{this.props.error}</div>)}
            </div>
        );
    }
}

TextFieldGroup.prototypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
