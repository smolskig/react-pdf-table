import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BlobProvider,
    Document,
    Font,
    Page,
    StyleSheet,
} from '@react-pdf/renderer'
import { PdfTable } from './components/PdfTable.tsx'

const App = () => {
    Font.register({
        family: 'Open Sans',
        fonts: [
            {
                src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
            },
            {
                src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
                fontWeight: 600,
            },
        ],
    })
    const styles = StyleSheet.create({
        tableStyle: {
            fontFamily: 'Open Sans',
            fontSize: 12,
        },
    })

    const source = [
        {
            name: 'Gabriel',
            lastName: 'Smolski',
            age: 22,
            role: 'Frontend Developer',
        },
    ]
    const Pdf = () => (
        <Document>
            <Page size={'A4'}>
                <PdfTable style={styles.tableStyle} dataSource={source}>
                    <PdfTable.Column name="Name" dataIndex="name" />
                    <PdfTable.Column name="Last Name" dataIndex="lastName" />
                    <PdfTable.Column name="Age" dataIndex="age" />
                    <PdfTable.Column name="Role" dataIndex="role" />
                </PdfTable>
            </Page>
        </Document>
    )

    return (
        <BlobProvider document={<Pdf />}>
            {({ url }) => {
                return (
                    <button
                        onClick={() => {
                            if (url) {
                                window.open(url)
                            }
                        }}
                    >
                        Imprimir
                    </button>
                )
            }}
        </BlobProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>
)
