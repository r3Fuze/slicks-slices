import path from "path"
import fetch from "isomorphic-fetch"

async function turnPizzasIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: path.resolve("./src/templates/Pizza.js"),
      context: {
        slug: pizza.slug.current,
      },
    })
  })
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `)

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: path.resolve("./src/pages/pizzas.js"),
      context: {
        topping: topping.name,
        // TODO: Regex for topping
      },
    })
  })
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `)

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve("./src/templates/Slicemaster.js"),
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    })
  })

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)

  for (let i = 0; i < pageCount; i += 1) {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve("./src/pages/slicemasters.js"),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  }
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ])
}
