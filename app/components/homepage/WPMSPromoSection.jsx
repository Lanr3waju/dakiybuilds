import ScrollRevealComponent from './ScrollRevealComponent'
import {
  Diversity1Sharp,
  EqualizerSharp,
  ErrorOutlineSharp,
  HubSharp,
  InsightsSharp,
  UpdateSharp,
} from '@mui/icons-material'

function WPMSPromoSection() {
  return (
    <section className="px-4 py-12 md:px-12">
      <h1 className="font-Poppins font-bold md:text-3xl text-2xl">
        Why use a web-based management system ? 🤔
      </h1>
      <ScrollRevealComponent>
        <ul className="mt-4 flex flex-wrap justify-center">
          <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <UpdateSharp className="text-5xl" />
              <h2 className="text-xl font-bold">Real-time updates: </h2>
              <p className="text-base-content/80">
                {' '}
                Changes made by one user are instantly reflected for everyone,
                ensuring everyone has the latest information and reducing the
                risk of outdated data leading to errors.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <Diversity1Sharp className="text-5xl" />
              <h2 className="text-xl font-bold">Remote Access</h2>
              <p className="text-base-content/80">
                Access your project from anywhere and at any time. No need to
                carry around bulky files and documents.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full rounded-lg border-2 border-solid  border-base-300 p-7 md:w-5/12">
            <ScrollRevealComponent>
              <HubSharp className="text-5xl" />
              <h2 className="text-xl font-bold">Centralized Communication</h2>
              <p className="text-base-content/80">
                Access your project from anywhere and at any time. No need to
                carry around bulky files and documents.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <InsightsSharp className="text-5xl" />
              <h2 className="text-xl font-bold">Automated Workflows</h2>
              <p className="text-base-content/80">
                Automate routine tasks like scheduling, progress tracking, and
                document management, freeing up time for more strategic work.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <EqualizerSharp className="text-5xl" />
              <h2 className="text-xl font-bold">Improved Data Analysis</h2>
              <p className="text-base-content/80">
                Data collected in the system can be easily analyzed to identify
                trends, improve decision-making, and optimize project
                performance.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full rounded-lg border-2 border-solid border-base-300 p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <ErrorOutlineSharp className="text-5xl" />
              <h2 className="text-xl font-bold">Reduced Errors</h2>
              <p className="text-base-content/80">
                Streamlined processes and centralized data minimize the risk of
                errors caused by manual data entry and document management.
              </p>
            </ScrollRevealComponent>
          </li>
        </ul>
      </ScrollRevealComponent>
    </section>
  )
}

export default WPMSPromoSection
