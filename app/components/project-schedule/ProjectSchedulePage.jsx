import HorizontalLine from "../utils/HorizontalLine"
import Progress from "../utils/Progress"
import NewResourceForm from "./NewResource"
import Resources from "./Resources"

function ProjectSchedulePage() {
    return (
        <main className="p-4">
            <section className="mx-auto bg-accent/10 p-4 rounded-lg border-2 border-accent-focus my-8">
                <Progress progress={55} />
                <div className="flex justify-between w-full font-Poppins font-semibold text-primary-content/70 text-sm">
                    <div>23rd November, 2023</div>
                    <div>30th December, 2024</div>
                </div>
                <button className="btn btn-secondary w-full md:w-1/4 mt-5">open gantt chart</button>
            </section>
            <HorizontalLine />
            <section className="mt-8">
                <h2 className="font-semibold uppercase text-primary-content/75">Resource Sheet</h2>
                <NewResourceForm />
                <Resources />
            </section>
        </main>
    )
}

export default ProjectSchedulePage
