import { graphql } from "gatsby"
import React from "react"
import Image from "gatsby-image"
import SEO from "../components/SEO"
import useForm from "../utils/useForm"
import calculatePizzaPrice from "../utils/calculatePizzaPrice"
import formatMoney from "../utils/formatMoney"
import OrderFormStyles from "../styles/OrderFormStyles"
import MenuItemStyles from "../styles/MenuItemStyles"
import usePizza from "../utils/usePizza"
import PizzaOrder from "../components/PizzaOrder"
import calculateOrderTotal from "../utils/calculateOrderTotal"

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes

  const { values, updateValue } = useForm({
    name: "",
    email: "",
    maple: "",
  })

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  })

  if (message) {
    return <p>{message}</p>
  }

  return (
    <>
      <SEO title="Order a pizza!" />
      <OrderFormStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
          <input
            type="text"
            name="maple"
            className="maple"
            value={values.maple}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Image
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {["S", "M", "L"].map((size) => (
                  <button
                    key={`btn-size-${size}`}
                    type="button"
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <legend>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </legend>
          <div>{error ? <p>Error: {error}</p> : ""}</div>
          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "Order Ahead"}
          </button>
        </fieldset>
      </OrderFormStyles>
    </>
  )
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
