import Image from 'next/image'

type Testimonial = {
  id: string
  name: string
  text: string
  role: string
  imgUrl: string
}

const TestimonialCard = ({ id, name, text, role, imgUrl }: Testimonial) => {
  return (
    <section
      id={id}
      className="relative isolate overflow-hidden bg-white dark:bg-gray-800 py-12 rounded-sm"
    >
      <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),gray-800)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-gray-800 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 dark:ring-indigo-900 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <Image
          width={100}
          height={100}
          className="mx-auto w-auto h-auto"
          src="/ODILogo.png"
          alt="ODI Logo"
          priority
        />
        <figure className="mt-10">
          <blockquote className="text-center font-semibold leading-8 sm:text-2xl sm:leading-9">
            <p>{`“${text}”`}</p>
          </blockquote>
          <figcaption className="mt-10 flex gap-2 justify-center">
            <div className="object-cover">
              <Image
                src={imgUrl}
                width={45}
                height={45}
                alt="Avatar"
                className="rounded-full border-2 border-gray-900"
              />
            </div>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-text">{role}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default TestimonialCard
