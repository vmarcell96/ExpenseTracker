import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils"


type BudgetCardProps = {
    name: string;
    amount: number;
    max?: number;
    gray: boolean;
    onAddExpenseClick: () => void;
}

export default function BudgetCard({ name, amount, max, gray, onAddExpenseClick }: BudgetCardProps) {
    const classNames = [];
    if (max) {
        if (amount > max) {
            classNames.push("bg-danger", "bg-opacity-10")
        }
    }
    if (gray && classNames.length === 0) {
        classNames.push("bg-light");
    }


    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        {max && <span className="text-muted fs-6 ms-1">
                            / {currencyFormatter.format(max)}
                        </span>}
                    </div>
                </Card.Title>
                {max && <ProgressBar
                    className="rounded-pill"
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />}
                <Stack direction="horizontal" gap={2} className="mt-4">
                    <Button
                        variant="outline-primary"
                        className="ms-auto"
                        onClick={onAddExpenseClick}
                    >
                        Add Expense
                    </Button>
                    <Button
                        variant="outline-secondary"
                    >
                        View Expenses
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount: number, max: number): string {
    const ratio = amount / max;
    if (ratio < .5) return "primary";
    if (ratio < .75) return "warning";
    return "danger";
}
