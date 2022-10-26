import React, { useContext } from "react";
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";

type GetBudgetExpensesParams = {
    budgetId: string
};
type AddExpenseParams = {
    description: string,
    amount: number,
    budgetId: string
};
type AddBudgetParams = {
    name: string,
    max: number
};
type DeleteFunctionParams = {
    id: string
};
export type Budget = {
    id: string,
    name: string,
    max: number,
};
export type Expense = {
    id: string,
    budgetId: string,
    amount: number,
    description: string,
};
export type GlobalContent = {
    budgets: Budget[],
    expenses: Expense[],
    getBudgetExpenses: ({budgetId}: GetBudgetExpensesParams) => Expense[],
    addExpense: ({description, amount, budgetId}: AddExpenseParams) => void,
    addBudget: ({name, max}: AddBudgetParams) => void,
    deleteBudget: ({id}: DeleteFunctionParams) => void,
    deleteExpense: ({id}: DeleteFunctionParams) => void
};
type ChildrenProp = {
    children: React.ReactNode,
};
const initBudget: Budget[] = [];
const initExpense: Expense[] = [];


//Init Context with dummy value
const BudgetsContext = React.createContext<GlobalContent>({
    budgets: initBudget,
    expenses: initExpense,
    getBudgetExpenses: () => initExpense,
    addExpense: () => {},
    addBudget: () => {},
    deleteBudget: () => {},
    deleteExpense: () => {}
});

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}: ChildrenProp) => {

    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getBudgetExpenses({budgetId}: GetBudgetExpensesParams): Expense[] {
        return expenses.filter((expense: Expense) => expense.budgetId === budgetId);
    };


    function addExpense({description, amount, budgetId}: AddExpenseParams): void {
        var newExpense: Expense = {id: uuidV4(), budgetId: budgetId, amount: amount, description: description};
        setExpenses((prevExpenses: any) => {
            return [...prevExpenses, newExpense];
        })
    };


    function addBudget({name, max}: AddBudgetParams): void {
        var newBudget: Budget = {id: uuidV4(), name, max};
        setBudgets((prevBudgets: any[]) => {
            // If new budget's name already exists we wont add it
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, newBudget];
        })
    };


    function deleteBudget({id}: DeleteFunctionParams): void {
        //TODO deal with expenses
        setBudgets((prevBudgets: any[]) => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    };


    function deleteExpense({id}: DeleteFunctionParams) {
        setExpenses((prevExpenses: any[]) => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    };


    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>

        {children}

    </BudgetsContext.Provider>;
}