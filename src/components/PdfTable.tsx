import ReactPDF, { View, Text, StyleSheet } from '@react-pdf/renderer'
import React, { ReactElement } from 'react'
import _ from 'lodash'

const styles = StyleSheet.create({
    pdfContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        width: '100%',
        fontSize: 12,
    },
    pdfRow: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        width: '100%',
        borderLeft: '1px solid lightgray',
        borderBottom: '1px solid lightgray',
    },
    pdfCol: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        borderRight: '1px solid lightgray',
        justifyContent:'center'
    },
    colData: {
        padding: 5,
    },
    pdfHeader: {
        fontWeight: 'extrabold',
        padding: 5,
    },
})

export const PdfTable = ({
    dataSource,
    footer: Footer,
    children,
    style,
}: {
    dataSource: any
    footer?: ReactElement<ReactPDF.View>
    children: any
    style?: any
}) => {
    return (
        <View style={[styles.pdfContainer, style]}>
            <>
                <Row style={styles.pdfRow}>
                    {React.Children.map(children, (element) => {
                        return (
                            <Cell
                                key={element.props.dataIndex}
                                style={[
                                    styles.pdfCol,
                                    { flex: element.props?.flex },
                                ]}
                            >
                                <Text style={styles.pdfHeader}>
                                    {element.props.name}
                                </Text>
                            </Cell>
                        )
                    })}
                </Row>
                {dataSource?.map((item: any, index: number) => {
                    return (
                        <Row key={index} style={styles.pdfRow}>
                            {React.Children.map(children, (element) => {
                                return (
                                    <Cell
                                        key={element.props.dataIndex}
                                        style={[
                                            styles.pdfCol,
                                            { flex: element.props?.flex },
                                        ]}
                                    >
                                        <Text style={styles.colData}>
                                            {element.props.format
                                                ? element.props.format(
                                                      _.get(
                                                          item,
                                                          element.props
                                                              .dataIndex
                                                      )
                                                  )
                                                : _.get(
                                                      item,
                                                      element.props.dataIndex
                                                  )}
                                        </Text>
                                    </Cell>
                                )
                            })}
                        </Row>
                    )
                })}
            </>
            {Footer ? Footer : ''}
        </View>
    )
}

const Row = ({ children, ...rest }: any) => {
    return (
        <View {...rest} style={styles.pdfRow} wrap={false}>
            {children}
        </View>
    )
}

const Cell = ({ children, ...rest }: any) => {
    return <View {...rest}>{children}</View>
}

const TableColumn = (_: {
    name: string
    dataIndex: string
    flex?: number
    format?: any
}) => {
    return <></>
}

PdfTable.Column = TableColumn
