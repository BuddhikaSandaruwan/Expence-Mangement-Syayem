export const columns = [
    {
        title: 'Transtraction Date',
        dataIndex: 'dateTime',
        key: 'dateTime',
        // ...getColumnSearchProps('dateTime'),
        // sorter: (a, b) => a.dateTime.length - b.dateTime.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Transaction Type',
        dataIndex: 'transactionType',
        // key: 'transactionType',
        // ...getColumnSearchProps('transactionType'),
        // sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        // ...getColumnSearchProps('amount'),
        // sorter: (a, b) => a.amount.length - b.amount.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
        // ...getColumnSearchProps('account'),
        // sorter: (a, b) => a.account.length - b.account.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        // ...getColumnSearchProps('category'),
        // sorter: (a, b) => a.category.length - b.category.length,
        // sortDirections: ['descend', 'ascend'],
      }
  ];