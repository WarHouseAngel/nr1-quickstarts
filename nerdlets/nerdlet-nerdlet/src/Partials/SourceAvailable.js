import React from 'react';
import DatasourceItem from '../../../../src/Shared/Partials/DatasourceItem';
import { NrqlQuery, Icon, Tooltip } from 'nr1'

class SourceAvailable extends React.Component {



    render() {
        if (this.props.accountId) {
            return (
                <NrqlQuery
                    accountId={this.props.accountId}
                    query={"SELECT count(*) FROM " + this.props.source + " SINCE 5 minutes ago"}
                >
                {({ data }) => {
                    console.log(data);
                    if (data && data.length > 0 && data[0].data.length > 0 && data[0].data[0].count > 0) {
                        return (
                            <Tooltip text="Requirement fulfilled!">
                                <Icon className="text-green" type={Icon.TYPE.INTERFACE__SIGN__CHECKMARK} />
                            </Tooltip>
                        );
                    } else {
                        return (
                            <Tooltip text="Requirement missing, check out the installation instructions below">
                                <Icon className="text-red" type={Icon.TYPE.INTERFACE__SIGN__EXCLAMATION__V_ALTERNATE} />
                            </Tooltip>
                        );
                    }
                }}
                </NrqlQuery>
            );
        }
        return null;
    }
}

export default SourceAvailable;
