import React, { ReactElement, createContext, useContext, useState } from 'react'
import ReactPDF, { StyleSheet, Text, View } from '@react-pdf/renderer'
import _ from 'lodash'

const PdfTableContext = createContext({
    dataSource: [],
    style: null,
})

const pdfStyles = StyleSheet.create({
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
        justifyContent: 'center',
    },
    colData: {
        padding: 5,
    },
    pdfHeader: {
        fontWeight: 'extrabold',
        padding: 5,
    },
})

const PdfTable = ({
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
        <PdfTableContext.Provider
            value={{
                dataSource,
                style,
            }}
        >
            <View>
                <View style={[pdfStyles.pdfRow, { ...style }]}>
                    {React.Children.map(children, (element) => {
                        return (
                            <HeadingCell
                                key={element.props.dataIndex}
                                name={element.props.name}
                                flex={element.props?.flex}
                            ></HeadingCell>
                        )
                    })}
                </View>
                {dataSource.map((data: any, dataIndex: number) => {
                    return (
                        <View
                            key={dataIndex}
                            style={[pdfStyles.pdfRow, { ...style }]}
                        >
                            {React.Children.map(children, (element) => {
                                //work around until find a better way of passing the index to the component
                                return React.cloneElement(element, {
                                    ...element.props,
                                    id: dataIndex,
                                })
                            })}
                        </View>
                    )
                })}
            </View>
        </PdfTableContext.Provider>
    )
}

const PdfColumn = ({
    dataIndex,
    flex,
    format,
    id,
}: {
    name: string
    dataIndex: string
    flex?: number
    format?: any
    id?: number
}) => {
    const context = useContext(PdfTableContext)
    if (!context.dataSource.length) {
        throw new Error(
            'You are allowed to use this component only as a Child of a PdfTable Component'
        )
    }

    return (
        <>
            <View style={[pdfStyles.pdfCol, { flex }]}>
                <Text style={[pdfStyles.colData]}>
                    {format
                        ? format(_.get(context?.dataSource[id], dataIndex))
                        : _.get(context?.dataSource[id], dataIndex)}
                </Text>
            </View>
        </>
    )
}

const HeadingCell = ({ name, flex }: { name: string; flex?: number }) => {
    return (
        <View style={[pdfStyles.pdfCol, { flex }]}>
            <Text style={[pdfStyles.pdfHeader]}>{name}</Text>
        </View>
    )
}

PdfTable.Column = PdfColumn

export { PdfTable }
