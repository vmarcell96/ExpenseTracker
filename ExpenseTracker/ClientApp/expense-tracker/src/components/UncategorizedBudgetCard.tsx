import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

type UncategorizedBudgetCardProps = {
    onAddExpenseClick: () => void;
    onViewExpensesClick: () => void;
}

export default function UncategorizedBudgetCard({onAddExpenseClick, onViewExpensesClick}: UncategorizedBudgetCardProps) {

    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses({budgetId: `${UNCATEGORIZED_BUDGET_ID}`})
                        .reduce((partsum, exp) => partsum + exp.amount, 0)

    if (amount === 0) return null;
    return (
        <BudgetCard 
            hideButtons={false} 
            amount={amount} 
            name="Uncategorized" 
            gray={true} 
            onAddExpenseClick={onAddExpenseClick} 
            onViewExpensesClick={onViewExpensesClick}
        />
    )
}
