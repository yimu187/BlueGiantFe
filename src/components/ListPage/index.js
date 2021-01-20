import React from 'react'
import { Icon, Dimmer, Loader,  Menu, Table } from 'semantic-ui-react'

const textAlingCenter = {textAlign: 'center'};

const ListPage = (props) => {

    const { tableData, onIconClick, loading } = props;

    return (
        <div>

            <Dimmer active={loading}>
                <Loader>Yükleniyor</Loader>
            </Dimmer>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5} style={textAlingCenter}>Ad</Table.HeaderCell>
                        <Table.HeaderCell width={5} style={textAlingCenter}>Soyad</Table.HeaderCell>
                        <Table.HeaderCell width={10} style={textAlingCenter}>Adres</Table.HeaderCell>
                        <Table.HeaderCell width={10} style={textAlingCenter}>Doğum Yeri</Table.HeaderCell>
                        <Table.HeaderCell width={2} style={textAlingCenter}>İşlem</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tableData.map((tableItem) => {
                        return (
                            <Table.Row celled key={tableItem.id}>
                                <Table.Cell style={textAlingCenter}>{tableItem.ad}</Table.Cell>
                                <Table.Cell style={textAlingCenter}>{tableItem.soyad}</Table.Cell>
                                <Table.Cell style={textAlingCenter}>{tableItem.adres}</Table.Cell>
                                <Table.Cell style={textAlingCenter}>{tableItem.dogumYeri}</Table.Cell>
                                <Table.Cell style={textAlingCenter}>
                                    <Icon name='pencil' id={tableItem.id} onClick={onIconClick}/>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>

        </div>
    )
}

export default ListPage;