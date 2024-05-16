import React, {useContext, useState} from "react"
import axios from "axios"

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    
    //Incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`) 
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        })

        return totalIncome;
    }

    //Expenses
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`) 
        getExpenses()
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense += expense.amount;
        })

        return totalExpense;
    }

    //Family
    const createFamily = async (familyData) => {
        try {
            const response = await axios.post(`${BASE_URL}create-family`, familyData);
            console.log(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const joinFamily = async (familyName) => {
        try {
            const response = await axios.post(`${BASE_URL}join-family/${familyName}`);
            console.log(response.data); 
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    //Other
    const totalMoney = () => {
        let totalMoney = 0;
        incomes.forEach((income) => {
            totalMoney += income.amount;
        })
        expenses.forEach((expense) => {
            totalMoney -= expense.amount;
        })

        return totalMoney;
    }

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpense,
            createFamily,
            joinFamily,
            totalMoney,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}