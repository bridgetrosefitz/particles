const modalData = [
  {
    position: [0, 50, 200],
    title: 'A little bit of history',
    text: 'In 1789, King Louis XVI\'s soldiers moved into Palais Royal and disrupted a group of civilians.'
  },
  {
    position: [0, 0, 200],
    title: 'Brands',
    text: ['Shadow', 'LEK', 'World Economic Forum'],
  },
  {
    position: [0, -50, 300],
    title: 'Projects',
    text: ['Digital Innovation', 'RACI', 'Personal website', 'Gratitude'],
  }
]

modalData.forEach(modal => modal.position[0] = Math.random() * 50)

export default modalData