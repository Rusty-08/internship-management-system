import Image, { StaticImageData } from 'next/image'
import odiLogoBlack from '@/public/general/images/odi-logo-black.svg'
import odiLogoWhite from '@/public/general/images/odi-logo-white.svg'
import { useTheme } from 'next-themes'

type Testimonial = {
  id: string
  name: string
  text: string
  role: string
  imgUrl: StaticImageData
}

const TestimonialCard = ({ id, name, text, role, imgUrl }: Testimonial) => {
  const { theme } = useTheme()

  return (
    <section
      id={id}
      className="relative bg-card w-[90vw] md:w-full py-12 rounded-sm"
    >
      {/* <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),gray-800)] opacity-20" /> */}
      {/* <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-gray-800 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 dark:ring-indigo-900 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" /> */}
      <div className="flex w-full items-center justify-center flex-col max-w-full">
        <Image
          width={150}
          height={80}
          src={theme === 'dark' ? odiLogoWhite : odiLogoBlack}
          alt="ODI Logo"
        />
        <figure className="mt-10 px-4 lg:px-[15%]">
          <blockquote className="text-center font-semibold leading-8 sm:text-2xl sm:leading-9">
            <p>{`“${text}”`}</p>
          </blockquote>
          <figcaption className="mt-10 flex gap-2 items-center justify-center">
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
              <p className="text-text text-sm">{role}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default TestimonialCard
