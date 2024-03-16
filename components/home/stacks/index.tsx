import React from 'react'
import SectionHeader from '../header'
import { stacksData } from './stacks-data'
import Stack from './stack'

const Stacks = () => {
  return (
    <section className="flex flex-col py:12 md:py-20">
      <SectionHeader
        header="Our Technology Stack"
        subHeader="Here are some of the technologies I've been working with recently"
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stacksData.map((stack, index) => (
          <Stack
            key={index}
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
