import AddDocs from "./AddDocs"
import DocType from "./DocType"
import SearchDocs from "./SearchDocs"

function DocumentsPage() {
    return (
        <section className="">
            <SearchDocs />
            <AddDocs />
            <DocType name='Drawings' />
            <DocType name='Contract Documents' />
            <DocType name='Schedules' />
            <DocType name='Work Orders' />
            <DocType name='Change Orders' />
            <DocType name='Payment Requests & Receipts' />
        </section>
    )
}

export default DocumentsPage
