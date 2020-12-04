import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ExportTerraform from '../Partials/ExportTerraform';
import ExportJson from '../Partials/ExportJson';
import {
    Button,
    BlockText,
    Icon,
    Grid,
    GridItem,
    NerdGraphQuery,
    TextField,
    Table,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TableRowCell,
    HeadingText,
    Modal,
    AccountPicker,
    Spinner,
    Tabs,
    TabsItem,
} from 'nr1';


class Tools extends React.Component {

    modalCallback = undefined;
    searchTimeout = undefined;

    searchQuery = `
    query($name: String!) {
        actor {
            entitySearch(queryBuilder: {type: DASHBOARD, name: $name}) {
                count
                query
                results {
                    entities {
                        account {
                            name
                            id
                        }
                        ... on DashboardEntityOutline {
                            guid
                            name
                            accountId
                        }
                    }
                }
            }
        }
    }
    `;

    downloadQuery = `
    query($guid: EntityGuid!){
        actor {
          entity(guid: $guid) {
            ... on DashboardEntity {
                name
                description
                pages {
                  name
                  description
                  widgets {
                    id
                    visualization
                    layout {
                      column
                      row
                      height
                      width
                    }
                    title
                    configuration {
                      area {
                        queries {
                          accountId
                          nrql
                        }
                      }
                      line {
                        queries {
                          accountId
                          nrql
                        }
                      }
                      bar {
                        queries {
                          accountId
                          nrql
                        }
                      }
                      billboard {
                        queries {
                          accountId
                          nrql
                        }
                        thresholds {
                          alertSeverity
                          value
                        }
                      }
                      pie {
                        queries {
                          accountId
                          nrql
                        }
                      }
                      table {
                        queries {
                          accountId
                          nrql
                        }
                      }
                      markdown {
                        text
                      }
                    }
                    rawConfiguration
                  }
                }
            }
          }
        }
      }
    `;

    constructor(props) {
        super(props);

        this._search = this._search.bind(this);
        this._getActions = this._getActions.bind(this);
        this.openTools = this.openTools.bind(this);
        this.closeTools = this.closeTools.bind(this);
        this.onChangeAccount = this.onChangeAccount.bind(this);
        this.onDashboardNameChange = this.onDashboardNameChange.bind(this);

        this.state = {
            toolsModalHidden: true,
            dashboardJson: '',
            dashboardName: '',
            dashboardLoading: true,
            search: {
                'name': '%',
            },
        };
    }

    openTools(guid) {
        const data = NerdGraphQuery.query({query: this.downloadQuery, variables: {guid: guid}})
        data.then(results => {
            console.log("received", results);
            this.setState({
                dashboardJson: results.data.actor.entity,
                dashboardName: results.data.actor.entity.name + ' Clone',
                dashboardLoading: false,
            });
        }).catch((error) => { console.log('Nerdgraph Error:', error); })

        this.setState({
            toolsModalHidden: false,
            dashboardLoading: true,
        });
    }

    closeTools() {
        this.setState({
            toolsModalHidden: true
        });
    }

    onChangeAccount(event, value) {
        this.setState({
            accountId: value
        });
    }

    onDashboardNameChange(event) {
        this.setState({
            dashboardName: event.target.value
        });
    }

    onCopyDashboard() {
        alert('soon');
    }

    _search(event) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        let search = event.target.value
        this.searchTimeout = setTimeout(() => {
            this.setState({
                search: {
                    'name': '%' + search + '%',
                }
            })
        }, 500);
    }

    _getActions() {
        return [
            {
                label: 'Open tools',
                iconType: TableRow.ACTIONS_ICON_TYPE.INTERFACE__OPERATIONS__ALERT,
                onClick: (evt, { item, index }) => {
                    this.openTools();
                },
            },
        ];
    }

    render() {
        return (
            <div className="container" id="root">
                <div className="row header">
                    <div className="col-8">
                        <h2>Tools</h2>
                    </div>
                    <div className="col-4 text-right">
                        <Link className="btn btn-default" to={"/"}>
                            <FontAwesomeIcon icon={faHome} /> Back to listing
                        </Link>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-12">
                        <h2>Search</h2>
                        <TextField className="custom-textfield" type={TextField.TYPE.SEARCH} onChange={this._search} spacingType={[TextField.SPACING_TYPE.LARGE, TextField.SPACING_TYPE.NONE, TextField.SPACING_TYPE.LARGE, TextField.SPACING_TYPE.NONE]} />

                        <h2>Dashboards</h2>
                        <NerdGraphQuery query={this.searchQuery} variables={this.state.search}>
                        {({ data, error, loading }) => {
                            if (loading) return <Spinner />
                            if (error) return <BlockText>{error.message}</BlockText>
                            return (
                                <div id="results">
                                    {data.actor.entitySearch.count > 200 &&
                                        <p>You have access to more than 200 dashboards, please use search to narrow your results:</p>
                                    }
                                    <Table items={data.actor.entitySearch.results.entities}>
                                        <TableHeader>
                                            <TableHeaderCell>Name</TableHeaderCell>
                                            <TableHeaderCell>Account</TableHeaderCell>
                                        </TableHeader>
                                        {({ item }) => (
                                            <TableRow actions={this._getActions()} onClick={(evt, { item, index }) => { this.openTools(item.guid); }}>
                                                <TableRowCell>{item.name}</TableRowCell>
                                                <TableRowCell>{item.account.name}</TableRowCell>
                                            </TableRow>
                                        )}
                                    </Table>
                                </div>

                            )
                        }}
                        </NerdGraphQuery>
                    </div>
                </div>
                <Modal hidden={this.state.toolsModalHidden} onClose={this.closeTools}>
                    <HeadingText spacingType={[AccountPicker.SPACING_TYPE.LARGE]} type={HeadingText.TYPE.HEADING_1}>Export dashboard</HeadingText>
                    <Tabs defaultValue="tab-1">
                        <TabsItem value="tab-1" label="Copy to">
                            <p>Where do you want to copy the dashboard to?</p>
                            <AccountPicker
                                value={this.state.accountId}
                                onChange={this.onChangeAccount}
                                spacingType={[AccountPicker.SPACING_TYPE.LARGE]}
                            />
                            <p>How do you want to name the dashboard?</p>
                            <Grid>
                                <GridItem columnSpan={12}>
                                    <TextField className="custom-textfield" value={this.state.dashboardName} type={TextField.TYPE.TEXT} onChange={this.onDashboardNameChange} spacingType={[TextField.SPACING_TYPE.LARGE, TextField.SPACING_TYPE.NONE, TextField.SPACING_TYPE.LARGE, TextField.SPACING_TYPE.NONE]} />
                                </GridItem>
                            </Grid>
                            <Button
                                type={Button.TYPE.PRIMARY}
                                iconType={Icon.TYPE.INTERFACE__OPERATIONS__COPY_TO}
                                onClick={this.onCopyDashboard}
                            >Copy dashboard</Button>
                        </TabsItem>
                        <TabsItem value="tab-2" label="Generate Terraform">
                            {this.state.dashboardLoading && <Spinner />}
                            {!this.state.dashboardLoading && <ExportTerraform json={this.state.dashboardJson} />}
                        </TabsItem>
                        <TabsItem value="tab-3" label="Export Json">
                            {this.state.dashboardLoading && <Spinner />}
                            {!this.state.dashboardLoading && <ExportJson json={this.state.dashboardJson} />}
                        </TabsItem>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default Tools;
