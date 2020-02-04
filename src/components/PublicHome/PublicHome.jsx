import React from "react";
import { withTranslation } from "react-i18next";

class PublicHome extends React.Component {
  render() {
    const { t } = this.props;
    return <div>Zona pública</div>;
  }
}

export default withTranslation()(PublicHome);