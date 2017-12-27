import React, {Component} from "react";
import {Row, Icon} from "antd";

class NoData extends Component {

  render() {
    const {icon, text, className, style} = this.props;
    return (
      <div className={`empty-component ${className ? className : ""}`} style={style || {}}>
        { icon &&
          <Row type="flex" justify="center" align="middle" className="icon-row">
            <Icon type={icon} className="empty-icon"/>
          </Row>
        }
        { text &&
          <Row type="flex" justify="center" align="middle" className="text-row">
            {text}
          </Row>
        }
      </div>
    );
  }

}

export default NoData;
