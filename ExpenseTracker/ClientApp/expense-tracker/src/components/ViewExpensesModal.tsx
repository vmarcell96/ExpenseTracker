import { Button, Modal, Stack } from "react-bootstrap"
import {Budget, UNCATEGORIZED_BUDGET_ID, useBudgets} from '../contexts/BudgetContext'
import { currencyFormatter } from "../utils";


type ViewExpensesModalProps = {
    budgetId: string,
    handleClose: () => void,
}

export default function ViewExpensesModal({ budgetId, handleClose }: ViewExpensesModalProps) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses({budgetId: budgetId})
    const uncategorizedBudget: Budget = { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID, max: 0 }

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? uncategorizedBudget
        : budgets.find(b => b.id === budgetId);

    return (
        <Modal show={budgetId !== ""} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Stack direction="horizontal" gap={2}>
                        <div className="fs-3">Expenses - {budget?.name}</div>
                        {budget && budgetId !== UNCATEGORIZED_BUDGET_ID && 
                        (
                            <Button 
                                variant="outline-danger"
                                onClick={()=> { 
                                deleteBudget({id: budget?.id})
                                handleClose()
                            }}>
                                Delete
                             </Button>
                        )}
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap={3}>
                        {expenses.map(expense => (
                            <Stack direction="horizontal" gap={2} key={expense.id}>
                                <div className="me-auto fs-4">{expense.description}</div>
                                <div className="ms-auto fs-5">{currencyFormatter.format(expense.amount)}</div>
                                <Button 
                                    size="sm" 
                                    variant="outline-danger"
                                    onClick={() => {deleteExpense({id: expense.id})}}
                                >
                                    &times;
                                </Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
        </Modal>
    )
}
