import React from 'react'
import SectionHeader from '../header'
import { stacksData } from './stacks-data'
import Stack from './stack'

const Stacks = () => {
  return (
    <section className="flex flex-col py-20">
      <SectionHeader
        header="Stacks"
        subHeader="Here are some of the technologies I've been working with recently"
      />
      <div className="grid grid-cols-3 gap-4">
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
