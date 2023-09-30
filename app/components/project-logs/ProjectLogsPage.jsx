import HorizontalLine from '../utils/HorizontalLine'

function ProjectLogsPage() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // TODO Use intersection observer API to render logs on scroll, add filters / sort buttons
  return (
    <section className="p-3 ">
      <button className="btn btn-neutral mx-auto mb-4 block w-2/4">
        Add new log
      </button>
      <HorizontalLine />
      <section className="my-8">
        <h3 className="font-Poppins text-lg font-semibold text-primary-content/70">
          April
        </h3>
        <div className=" flex w-full flex-wrap justify-start text-left text-primary-content/60">
          {data.map((doc) => (
            <button
              className="mx-2 my-4 w-full rounded-md bg-base-200 p-4 text-left shadow-lg shadow-base-300 transition-transform hover:translate-x-1 hover:translate-y-2 md:max-w-[300px]"
              key={doc}
            >
              <span className="text-left leading-loose tracking-wider underline underline-offset-4">
                The site was cleared, debris and other granular waste removed,
                and top soil rem.....
              </span>
              <HorizontalLine />
              <div className="font-Poppins">23-05-2020</div>
            </button>
          ))}
        </div>
      </section>
      <HorizontalLine />
      <section className="my-8">
        <h3 className="font-Poppins text-lg font-semibold text-primary-content/70">
          March
        </h3>
        <div className="flex w-full flex-wrap justify-start text-left text-primary-content/60">
          {data.map((doc) => (
            <button
              className="mx-2 my-4 w-full rounded-md bg-base-200 p-4 text-left shadow-lg shadow-base-300 transition-transform hover:translate-x-1 hover:translate-y-2 md:max-w-[300px]"
              key={doc}
            >
              <span className="text-left leading-loose tracking-wider underline underline-offset-4">
                The site was cleared, debris and other granular waste removed,
                and top soil rem.....
              </span>
              <HorizontalLine />
              <div className="font-Poppins">23-05-2020</div>
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}

export default ProjectLogsPage
