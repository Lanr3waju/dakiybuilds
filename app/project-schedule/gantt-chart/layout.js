export default function Layout({ children }) {
    return (
        <>
            <head>
                <title>Gantt Chart</title>
                <meta name="description" content="This is my Gantt Chart" />
                <link href="https://cdn.syncfusion.com/ej2/22.1.34/material3.css" rel="stylesheet" />
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
            </head>
            <main className="material3 p-4">
                {children}
            </main>
        </>
    )
}
