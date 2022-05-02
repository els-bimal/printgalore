import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import data from './../../i18n/locales/en_US';
const InjectMassage = props => <FormattedMessage {...props} />;
//const InjectMassage = props => <h3>{data[props.id]}</h3>
export default injectIntl(InjectMassage, {
  withRef: false,
});
