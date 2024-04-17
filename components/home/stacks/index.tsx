import SectionHeader from '../header'
import Stack from './stack'
import { stacksData } from './stacks-data'

const Stacks = () => {
  return (
    <section className="flex flex-col py:12 md:py-20">
      <SectionHeader
        header="Our Technology Stack"
        subHeader="We’ve been diligently developing and integrating a diverse range of cutting-edge technologies to deliver robust and innovative solutions to our clients."
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stacksData.map((stack, index) => (
          <Stack
            key={`${stack.id}-${index}`}
            id={stack.id}
            image={stack.image}
            title={stack.title}
            desc={stack.desc}
            link={stack.link}
          />
        ))}
      </div>
    </section>
  )
}

export default Stacks
