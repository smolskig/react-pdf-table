This is a Work-in-progress project, feel free to open issues and suggest changes 

It's not intended to be used in production yet, for now its just an study project
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

The syntax above will result in this PDF:
![image](https://github.com/smolskig/react-pdf-table/assets/50807768/5623af6b-beb0-4a67-b62e-c9254e60247b)


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
