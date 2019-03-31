import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

class TextAreaFieldGroup extends Component {
    render() {
        return (
            <div className="form-group">
                <textarea
                    placeholder={this.props.placeholder}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': this.props.error
                    })}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
                {this.props.info && (<small className="form-text text-muted">{this.props.info}</small>)}
                {this.props.error && (<div className="invalid-feedback">{this.props.error}</div>)}
            </div>
        );
    }
}

TextAreaFieldGroup.prototypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TextAreaFieldGroup.defaultProps = {
    type: 'text'
};

export default TextAreaFieldGroup;
