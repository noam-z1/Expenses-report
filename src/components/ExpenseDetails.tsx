import React from 'react';
import Slider from 'react-slick';
import { ExpenseData } from '../models/ExpenseData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ExpenseDetails({
  expenses,
}: {
  expenses: ExpenseData[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowButton direction="next" />,
  };

  if (expenses.length == 0) {
    return (
      <>
        <h1>Expense Details</h1>
        <label>Please Add Expenses</label>
      </>
    );
  }

  return (
    <>
      <h1>Expense Details</h1>
      <Slider {...settings}>
          {expenses.map((expense, index) => {
            const date = new Date(expense.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return (
              <div key={index} className="expense-details-item">
                <label>Expense category</label>
                <h3>{expense.category}</h3>
                <label>Expense month</label>
                <h3>{`${month}/${year}`}</h3>
                {expense.oldValue !== undefined && (
                  <>
                    <h3>Old value - {expense.oldValue}</h3>
                    <h3>New value - {expense.newValue}</h3>
                  </>
                )}
              </div>
            );
          })}
        </Slider>
    </>
  );
}

function ArrowButton({ direction, onClick }: { direction: string; onClick?: () => void }) {
  return (
    <button className={`carousel-arrow ${direction}`} onClick={onClick}>
      {'Next'}
    </button>
  );
}
