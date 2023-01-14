import {Modal, Form,
  Input,
  Button,
  Select,
  DatePicker, Col, Divider, Row, Tabs
 } from 'antd';
import axios from "axios";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const { TextArea } = Input;

const ButtonPanel = ({callback}) => {
  const [open, setOpen] = useState(false);
  const [accountOpenModel, setaccountOpenModel] = useState(false);
  const [openCategoryModel, setopenCategoryModel] = useState(false);
  const [openBudgetModel, setopenBudgetModel] = useState(false);
  const [tabKey, setTabKey] = useState("1");
  const onChange = (key) => {
    setTabKey(key);
    callback(key);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  

  console.log(tabKey)
  const onFinish = (values) => {
    //Can directly call props here
    axios.post(`http://127.0.0.1:8070/expense-tracker-api/transaction/add`, {
      dateTime: values.dateTime,
      payer: values.payer,
      payee: values.payee,
      accountId: values.accountId,
      categoryId: values.categoryId,
      transactionType: values.transactionType,
      recurrenceStatus: values.recurrenceStatus,
      recurrenceEndDate: values.recurrenceEndDate,
      amount: values.amount,
      recurrenceFrequency: values.recurrenceFrequency,
      transactionNote: values.transactionNote
  })
      .then(res => {
        console.log(res);
        console.log(res.data);
        Toast.fire({
          icon: 'success',
          title: 'saved successfully'
        });
        window.location.reload(false);
      })
  };
  const onFinishAccount = (values) => {
    //Can directly call props here
    axios.post(`http://127.0.0.1:8070/expense-tracker-api/account/add`, {
      accountName: values.accountName,
      accountBalance: values.accountBalance,
      accountTypeId: values.accountTypeId,
      typeName: values.typeName
  })
      .then(res => {
        console.log(res);
        console.log(res.data);
        Toast.fire({
          icon: 'success',
          title: 'saved successfully'
        });
        window.location.reload(false);
      })
  };

  const onFinishCategory = (values) => {
    //Can directly call props here
    axios.post(`http://127.0.0.1:8070/expense-tracker-api/category/add/`+values.categoryType, {
      categoryName: values.categoryName,
      addedOn: values.addedOn,
      budgetId: values.budgetId,
      incomeStatus: values.incomeStatus,
      expenseStatus: values.expenseStatus,
      categoryType: values.categoryType
  })
      .then(res => {
        console.log(res);
        console.log(res.data);
        Toast.fire({
          icon: 'success',
          title: 'saved successfully'
        });
        window.location.reload(false);
      })
  };

  const onFinishBudget = (values) => {
    //Can directly call props here
    axios.post(`http://127.0.0.1:8070/expense-tracker-api/budget/add`, {
      amount: values.amount,
      budgetNote: values.budgetNote
  })
      .then(res => {
        console.log(res);
        console.log(res.data);
        Toast.fire({
          icon: 'success',
          title: 'saved successfully'
        })
        window.location.reload(false);
      })
  };
  const [AccountData, setAccountData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [BudgetData, setBudgetData] = useState([]);

  const items = [
    {
      key: '1',
      label: `TRANSACTIONS`,
      children: `Transaction`,
    },
    {
      key: '2',
      label: `CATEGORIES`,
      children: `Category`,
    },
    {
      key: '3',
      label: `BUDGET`,
      children: `Budget`,
    },
    {
      key: '4',
      label: `ACCOUNTS`,
      children: `Account`,
    },
  ];


  useEffect(() => {
    //Runs only on the first render
    const baseURL = "http://127.0.0.1:8070/expense-tracker-api/account/all";
    axios.get(baseURL).then((response) => {
        setAccountData(response.data);
      });

      const baseURLCategory = "http://127.0.0.1:8070/expense-tracker-api/category/all";
      axios.get(baseURLCategory).then((response) => {
          setCategoryData(response.data);
        });

        const budgetURL = "http://127.0.0.1:8070/expense-tracker-api/budget/all";
      axios.get(budgetURL).then((response) => {
          setBudgetData(response.data);
        });
  }, [1]);

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      


        {tabKey == 1 && (<Button type="primary" onClick={() => setOpen(true)}>
        Add Transtraction
      </Button>)}
        {tabKey == 2 && (<Button type="primary" onClick={() => setopenCategoryModel(true)}>
        Add Category
      </Button>)}
        {tabKey == 3 && (<Button type="primary" onClick={() => setopenBudgetModel(true)}>
        Add Budget
      </Button>)}
        {tabKey == 4 && (<Button type="primary" onClick={() => setaccountOpenModel(true)}>
        Add Account
      </Button>)}


      <Modal
        title="Add Transtraction"
        centered
        open={open}
        onOk={() =>  setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >  
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >
       <Form.Item label="DatePicker" name="dateTime">
          <DatePicker name="dateTime"/>
        </Form.Item>
        <Form.Item label="Payer" name="payer">
          <Input name="payer"/>
        </Form.Item>
        <Form.Item label="Payee" name="payee">
          <Input name="payee"/>
        </Form.Item>
        <Form.Item label="Account" name="accountId">
          <Select name="accountId">
            {AccountData.map(({ accountId, accountName }, index) => <Select.Option value={accountId} >{accountName}</Select.Option>)}
          </Select>
        </Form.Item >
        <Form.Item label="Category" name="categoryId">
          <Select name="categoryId">
          {CategoryData.map(({ categoryId, categoryName }, index) => <Select.Option value={categoryId} >{categoryName}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Transaction Type" name="transactionType">
          <Select name="transactionType">
            <Select.Option value="1">INCOME</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Recurrence Status" name="recurrenceStatus">
          <Select name="recurrenceStatus">
            <Select.Option value='true'>True</Select.Option>
            <Select.Option value='false'>False</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Recurrence End Date" name="recurrenceEndDate">
          <DatePicker name="recurrenceEndDate"/>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input name="amount"/>
        </Form.Item>
        <Form.Item label="Recurrence Frequency" name="recurrenceFrequency">
          <Input name="recurrenceFrequency"/>
        </Form.Item>
        <Form.Item label="Transaction Note" name="transactionNote">
          <TextArea rows={4} name="transactionNote"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
      </Modal>
      {/* ------- */}
      <Modal
        title="Add Category"
        centered
        open={openCategoryModel}
        onOk={() =>  setopenCategoryModel(false)}
        onCancel={() => setopenCategoryModel(false)}
        width={1000}
        footer={null}
      >  
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinishCategory}
      >
        <Form.Item label="Category Name" name="categoryName">
          <Input name="categoryName"/>
        </Form.Item>
        <Form.Item label="Income Status" name="incomeStatus">
          <Input name="incomeStatus"/>
        </Form.Item>
        <Form.Item label="budget" name="budgetId">
          <Select name="budgetId">
            {BudgetData.map(({ budgetId, budgetNote, amount }, index) => <Select.Option value={budgetId} >{budgetNote +"-"+ amount}</Select.Option>)}
          </Select>
        </Form.Item >
        <Form.Item label="Eadded On" name="addedOn">
          <DatePicker name="addedOn"/>
        </Form.Item>
        <Form.Item label="Expense Status" name="expenseStatus">
          <Input name="expenseStatus"/>
        </Form.Item>
        <Form.Item label="Category Type" name="categoryType">
          <Input name="categoryType"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
      </Modal>

      {/* -------------- */}

      <Modal
        title="Add Account"
        centered
        open={accountOpenModel}
        onOk={() =>  setaccountOpenModel(false)}
        onCancel={() => setaccountOpenModel(false)}
        width={1000}
        footer={null}
      >  
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinishAccount}
      >
        <Form.Item label="Account Name" name="accountName">
          <Input name="accountName"/>
        </Form.Item>
        <Form.Item label="Account Balance" name="accountBalance">
          <Input name="accountBalance"/>
        </Form.Item>
        <Form.Item label="Account Type Id" name="accountTypeId">
          <Select name="accountTypeId">
          <Select.Option value="1">INCOME</Select.Option>
          </Select>
        </Form.Item >
        <Form.Item label="Type Name" name="typeName">
        <Input name="typeName"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
      </Modal>

      {/* --------- */}

      <Modal
        title="Add Budget"
        centered
        open={openBudgetModel}
        onOk={() =>  setopenBudgetModel(false)}
        onCancel={() => setopenBudgetModel(false)}
        width={600}
        footer={null}
      >  
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinishBudget}
      >
        <Form.Item label="Amount" name="amount">
          <Input name="amount"/>
        </Form.Item>
        <Form.Item label="Budget Note" name="budgetNote">
          <Input name="budgetNote"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
      </Modal>
    </>
  );
};
export default ButtonPanel;