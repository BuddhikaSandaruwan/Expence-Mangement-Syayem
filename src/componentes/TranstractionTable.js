import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Table , Popconfirm, Typography, InputNumber} from 'antd';
import { useRef, useState, useEffect } from 'react';
import axios from "axios";
import Highlighter from 'react-highlight-words';
const originData = [];
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const TranstractionTable = ({selectedColumn}) => {

  // const [selectedColumnData, setSelectedColumnData] = useState("");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState(originData);
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
    
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [transtractionData, setTranstractionData] = useState([]);

  useEffect(() => {
    //Runs only on the first render
    if(selectedColumn === "Trantraction"){
      const baseURL = "http://127.0.0.1:8070/expense-tracker-api/transaction/all";
      axios.get(baseURL).then((response) => {
          console.log(response.data);
          const transactionArr = [];
          for(let index = 0; index < response.data.length; index++) {
              let data = {
                  "key": response.data[index].transactionId,
                  "dateTime": response.data[index].dateTime,
                  "transactionNote": response.data[index].transactionNote,
                  "transactionType": response.data[index].transactionType,
                  "amount": response.data[index].amount,
                  "account": response.data[index].account.accountName,
                  "category": response.data[index].category.categoryName,
                }
              transactionArr.push(data);
          }
          setTranstractionData(transactionArr);
        });
     }else if(selectedColumn === "Category"){
      const baseURLCatega = "http://127.0.0.1:8070/expense-tracker-api/category/all";
      axios.get(baseURLCatega).then((response) => {
          console.log(response.data);
          const transactionArr = [];
          for(let index = 0; index < response.data.length; index++) {
              let data = {
                  "categoryName": response.data[index].categoryName,
                  "addedOn": response.data[index].addedOn,
                  "budgetId": response.data[index].budgetId,
                  "incomeStatus": response.data[index].incomeStatus,
                  "expenseStatus": response.data[index].expenseStatus,
                }
              transactionArr.push(data);
          }
          setTranstractionData(transactionArr);
        });
      }else if(selectedColumn === "Budget"){
        const baseURLCatega = "http://127.0.0.1:8070/expense-tracker-api/budget/all";
        axios.get(baseURLCatega).then((response) => {
            console.log(response.data);
            const transactionArr = [];
            for(let index = 0; index < response.data.length; index++) {
                let data = {
                    "amount": response.data[index].amount,
                    "budgetNote": response.data[index].budgetNote
                  }
                transactionArr.push(data);
            }
            setTranstractionData(transactionArr);
          });
        }else if(selectedColumn === "Account"){
          const baseURLCatega = "http://127.0.0.1:8070/expense-tracker-api/account/all";
          axios.get(baseURLCatega).then((response) => {
              console.log(response.data);
              const transactionArr = [];
              for(let index = 0; index < response.data.length; index++) {
                  let data = {
                      "accountName": response.data[index].accountName,
                      "budgetNote": response.data[index].budgetNote,
                      "accountBalance": response.data[index].accountBalance,
                      "typeName": response.data[index].typeName
                    }
                  transactionArr.push(data);
              }
              setTranstractionData(transactionArr);
            });
      }else{
        setTranstractionData(null);
     }
  }, [selectedColumn]);

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
 
  const TrantractionColumnName = [
    {
        title: 'Transtraction Date',
        dataIndex: 'dateTime',
        key: 'dateTime',
        ...getColumnSearchProps('dateTime'),
        sorter: (a, b) => a.dateTime.length - b.dateTime.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Transaction Type',
        dataIndex: 'transactionType',
        key: 'transactionType',
        ...getColumnSearchProps('transactionType'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        ...getColumnSearchProps('amount'),
        sorter: (a, b) => a.amount.length - b.amount.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
        ...getColumnSearchProps('account'),
        sorter: (a, b) => a.account.length - b.account.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        ...getColumnSearchProps('category'),
        sorter: (a, b) => a.category.length - b.category.length,
        sortDirections: ['descend', 'ascend'],
      }
  ];

  const AccountColumnName = [
    {
        title: 'Account Name',
        dataIndex: 'accountName',
        key: 'accountName',
        ...getColumnSearchProps('accountName'),
        sorter: (a, b) => a.dateTime.length - b.dateTime.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Account Balance',
        dataIndex: 'accountBalance',
        key: 'accountBalance',
        ...getColumnSearchProps('accountBalance'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Type Name',
        dataIndex: 'typeName',
        key: 'typeName',
        ...getColumnSearchProps('typeName'),
        sorter: (a, b) => a.amount.length - b.amount.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      }
  ];

  const CategoryColumnName = [
    {
        title: 'CategoryName',
        dataIndex: 'categoryName',
        key: 'categoryName',
        ...getColumnSearchProps('categoryName'),
        sorter: (a, b) => a.dateTime.length - b.dateTime.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'Added On',
        dataIndex: 'addedOn',
        key: 'addedOn',
        ...getColumnSearchProps('addedOn'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'budget',
        dataIndex: 'budgetId',
        key: 'budgetId',
        ...getColumnSearchProps('addedOn'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'Income Status',
        dataIndex: 'incomeStatus',
        key: 'incomeStatus',
        ...getColumnSearchProps('addedOn'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'Expense Status',
        dataIndex: 'expenseStatus',
        key: 'expenseStatus',
        ...getColumnSearchProps('expenseStatus'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      }
  ];

  const BudgetColumnName = [
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        ...getColumnSearchProps('amount'),
        sorter: (a, b) => a.dateTime.length - b.dateTime.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'Budget Note',
        dataIndex: 'budgetNote',
        key: 'budgetNote',
        ...getColumnSearchProps('budgetNote'),
        sorter: (a, b) => a.transactionType.length - b.transactionType.length,
        sortDirections: ['descend', 'ascend'],
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      }
  ];

  const desideColName = () => {
   if(selectedColumn === "Trantraction"){
    return TrantractionColumnName;
   }else if(selectedColumn === "Category"){
      return CategoryColumnName
    }else if(selectedColumn === "Budget"){
      return BudgetColumnName
    }else if(selectedColumn === "Account"){
      return AccountColumnName
    }else{
    return null;
   }
  }

  return <Table columns={desideColName()} dataSource={transtractionData} />;
};
export default TranstractionTable;