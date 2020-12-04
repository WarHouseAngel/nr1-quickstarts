import React from 'react';
import SourceAvailable from './SourceAvailable';

class InstallationInstructions extends React.Component {

    constructor(props) {
        super(props);

        let installation = this.props.sources.sort().map((source, i) => {
            // Speciale case if config specifically set's it's own options
            if (typeof source === 'object' && source !== null) {
                return source;
            }

            let data = {};
            switch(source) {
                case 'ComputeSample':
                    data = {
                        name: 'New Relic Amazon EC2 monitoring integration',
                        url: 'https://docs.newrelic.com/docs/integrations/amazon-integrations/aws-integrations-list/aws-ec2-monitoring-integration',
                    }
                    break;
                case 'SystemSample':
                case 'ProcessSample':
                    data = {
                        name: 'New Relic Infrastructure',
                        url: 'https://docs.newrelic.com/docs/infrastructure/install-configure-manage-infrastructure'
                    }
                    break;
                case 'PageView':
                case 'BrowserInteraction':
                case 'JavaScriptError':
                case 'PageViewTiming':
                    data = {
                        name: 'New Relic Browser',
                        url: 'https://docs.newrelic.com/docs/browser/new-relic-browser/installation/install-new-relic-browser-agent'
                    }
                    break;
                case 'SyntheticRequest':
                case 'SyntheticCheck':
                    data = {
                        name: 'New Relic Synthetics',
                        url: 'https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/getting-started/introduction-new-relic-synthetics'
                    }
                    break;
                case 'Transaction':
                    data = {
                        name: 'New Relic APM',
                        url: 'https://docs.newrelic.com/docs/apm'
                    }
                    break;
                case 'Kubernetes':
                case 'K8sContainerSample':
                case 'K8sNodeSample':
                case 'K8sPodSample':
                    data = {
                        name: 'New Relic Kubernetes',
                        url: 'https://docs.newrelic.com/docs/integrations/kubernetes-integration/get-started/introduction-kubernetes-integration'
                    }
                    break;
                case 'Prometheus':
                    data = {
                        name: 'New Relic Prometheus Integration',
                        url: 'https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure/install-update-or-uninstall-your-prometheus-openmetrics-integration'
                    }
                    break;
                case 'Log':
                    data = {
                        name: 'New Relic Logs',
                        url: 'https://docs.newrelic.com/docs/logs'
                    }
                    break;
                case 'Flex': // Speciale case for flex metrics
                    data = {
                        name: 'New Relic Flex',
                        url: 'https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/flex-integration-tool-build-your-own-integration'
                    }
                    break;
                case 'Metric': // Case to ingore, as they are general metrics
                    data = {};
                    break;
                default:
                    data = {
                        name: 'Unknown source: ' + source,
                    }
                    break;
            }

            data.source = source;

            return data;
        }).sort().filter(function(item, pos, ary) {
            if (!item.name) { return false; }
            return !pos || item.name !== ary[pos - 1].name;
        });

        this.state = {
            requirements: installation
        }
    }

    render() {
        return (
            <div>
                {this.state.requirements.sort((a, b) => (a.name > b.name) ? 1 : -1).map((requirement, i) => {
                    if (requirement.url) {
                        return (
                            <div key={requirement.name}>
                                <h4>{requirement.name} <SourceAvailable accountId={this.props.accountId} source={requirement.source} /></h4>
                                <p><a href={requirement.url} target="_BLANK" rel="noopener noreferrer">{requirement.url}</a></p>
                            </div>
                        )
                    } else {
                        return ( <li key={requirement.name}>{requirement.name}</li> )
                    }
                })}
            </div>
        );
    }

}

export default InstallationInstructions;
