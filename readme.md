# React-PDF Table

A simple Table to use with React-PDF library

## Basic Usage:

```javascript

// this styles are not required
const styles = StyleSheet.create({
    tableStyle: {
        fontFamily: 'Open Sans',
        fontSize: 12,
    },
})
const source = [
    {
        name: "Gabriel",
        lastName: "Smolski",
        age: 22,
        role: "Frontend Developer"
    }
]

<Document>
    <Page size={'A6'}>
        <PdfTable style={styles.tableStyle} dataSource={source}>
            <PdfTable.Column name="Name" dataIndex="name" />
            <PdfTable.Column name="Last Name" dataIndex="lastName" />
            <PdfTable.Column name="Age" dataIndex="age" />
            <PdfTable.Column name="Role" dataIndex="role" />
        </PdfTable>
    </Page>
</Document>

```

The below syntax will result in this PDF:

## Dynamic column width with `flex`:

You can apply the `flex` property to a column, so it grows more

```javascript
//all react-pdf related code
<PdfTable style={styles.tableStyle} dataSource={source}>
    <PdfTable.Column name="Name" dataIndex="name" />
    <PdfTable.Column name="Last Name" dataIndex="lastName" />
    <PdfTable.Column name="Age" dataIndex="age" />
    <PdfTable.Column flex={2} name="Role" dataIndex="role" />
</PdfTable>
```
