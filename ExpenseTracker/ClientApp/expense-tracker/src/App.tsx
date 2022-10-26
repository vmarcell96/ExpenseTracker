import { Container, Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import './App.css';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<string>("");
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId?: string) {
    setShowAddExpenseModal(true);
    if (budgetId) {
      setAddExpenseModalBudgetId(budgetId);
    } else {
      setAddExpenseModalBudgetId(`${UNCATEGORIZED_BUDGET_ID}`);
    }
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => { setShowAddBudgetModal(true) }}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => { openAddExpenseModal() }}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}
        >
          {budgets.map(budget => {
            //Filter expenses for actual budget, sum the expense's values
            const amount = getBudgetExpenses({ budgetId: budget.id }).reduce((partSum, exp) => partSum + exp.amount, 0);
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                gray={false}
                onAddExpenseClick={() => { openAddExpenseModal(budget.id) }}
              />

            )
          }
          )}
          <UncategorizedBudgetCard onAddExpenseClick={() => { openAddExpenseModal() }} />
          <TotalBudgetCard onAddExpenseClick={() => { openAddExpenseModal() }} />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => { setShowAddBudgetModal(false) }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => { setShowAddExpenseModal(false) }}
        defaultBudgetId={addExpenseModalBudgetId}
      />
    </>
  )
}

export default App;
