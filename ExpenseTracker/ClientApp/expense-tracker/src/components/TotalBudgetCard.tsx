import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

type UncategorizedBudgetCardProps = {
    onAddExpenseClick: () => void;
}

export default function TotalBudgetCard({onAddExpenseClick}: UncategorizedBudgetCardProps) {

    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce((partsum, exp) => partsum + exp.amount, 0)
    const max = budgets.reduce((partsum, budget) => partsum + budget.max, 0)
    if (max === 0) return null;
    return (
        <BudgetCard amount={amount} max={max} name="Total" gray={true} onAddExpenseClick={onAddExpenseClick}/>
    )
}
