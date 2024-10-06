'use client'
import { DakiyStore } from "@/context/context"
import { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Set up the x-axis categories
const categories = ['Labor', 'Material', 'Equipment', 'Subcontractor', 'Others'];

export default function BudgetExpenditureChart() {
    const { budgets, expenditures } = useContext(DakiyStore);

    // Extract expenditure by category (sum of all expenditures per category)
    const expenditureByCategory = expenditures.reduce((acc, exp) => {
        const category = exp.category;
        const amount = parseFloat(exp.amount || 0);

        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;

        return acc;
    }, {});

    // Extract budget by category
    const budgetByCategory = {
        Labor: parseFloat(budgets.Labor || 0),
        Material: parseFloat(budgets.Material || 0),
        Equipment: parseFloat(budgets.Equipment || 0),
        Subcontractor: parseFloat(budgets.Subcontractor || 0),
        Others: parseFloat(budgets.Others || 0),
    };

    // Prepare data for the chart
    const chartData = categories.map((category) => ({
        name: category,
        Expenditure: expenditureByCategory[category] || 0,
        Budget: budgetByCategory[category],
    }));

    // Check if data is valid before rendering the chart
    if (chartData.length === 0) {
        return <p>No data available for the chart.</p>;
    }

    return (
        <section className='my-2 rounded-lg bg-base-100 p-2 font-Roboto text-sm shadow-md'>
            <h2 className='font-Roboto text-sm font-medium text-primary-content'>Expenditure / Budget</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Expenditure" stroke="#f21111" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Budget" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </section>
    )
}
