import ScrollRevealComponent from './ScrollRevealComponent'
import {
  AirSharp,
  EngineeringSharp,
  PriceCheck,
  ShieldSharp,
  SupportAgentSharp,
} from '@mui/icons-material'

function DakiybuildsPromoSection() {
  return (
    <section className="border-t-4 border-b-base-300 bg-neutral-content px-4 py-12 md:px-12">
      <h1 className="font-Poppins text-2xl font-bold md:text-3xl">
        Why chose <span className="font-Fascinate">dakiyBuilds ? 🤨</span>
      </h1>
      <ScrollRevealComponent>
        <ul className="mt-4 flex flex-wrap justify-center">
          <li className="m-3 w-full p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <EngineeringSharp className="text-5xl" />
              <h2 className="text-xl font-bold">
                Built by the industry, for the industry:
              </h2>
              <p className="text-base-content/80">
                {' '}
                We understand your unique challenges and pain points.
                Dakiybuilds is designed specifically for construction workflows.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <AirSharp className="text-5xl" />
              <h2 className="text-xl font-bold">
                Simple to learn, powerful to use:
              </h2>
              <p className="text-base-content/80">
                Get started quickly with our intuitive interface and
                user-friendly features. No IT expertise needed.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 p-7 md:w-5/12">
            <ScrollRevealComponent>
              <PriceCheck className="text-5xl" />
              <h2 className="text-xl font-bold">Provides a Free tier</h2>
              <p className="text-base-content/80">
                Access core features like document storage, team management,
                scheduling, and basic budget tracking completely FREE
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <ShieldSharp className="text-5xl" />
              <h2 className="text-xl font-bold">Future proof your projects</h2>
              <p className="text-base-content/80">
                Get ready for the evolution! Dakiybuilds is constantly evolving,
                with exciting AI-powered features and integrations coming soon.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full p-7 md:w-5/12 ">
            <ScrollRevealComponent>
              <SupportAgentSharp className="text-5xl" />
              <h2 className="text-xl font-bold">24/7 Customer Support</h2>
              <p className="text-base-content/80">
                We are here to help you every step of the way. Our support team
                is available 24/7 to help you with any issues you may encounter.
              </p>
            </ScrollRevealComponent>
          </li>
          <li className="m-3 w-full rounded-lg p-7 md:w-5/12 ">
          </li>
        </ul>
      </ScrollRevealComponent>
    </section>
  )
}

export default DakiybuildsPromoSection
