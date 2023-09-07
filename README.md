# State vs Props

- What's the difference? 

- State: is INTERNAL data, owned by the component
    - Component memory
    - Can be updated by the component itself
    - Updating state causes component to re-render
    - Used to make components interactive

- Props: is EXTERNAL data, owned by parent component
    - Similar to function parameters
    - Read-only
    - *** Receiving new props causes component to re-render. Usually when the parent's state has been updated 

# "Thinking" in React - a Completely new mindset. Not a rigid process, more of a guideline.

- How to work with React API (state, ref, context)
- React Mindset! - While building a react app, you have a very good mental model for when to use to state, props, data flow, effects, etc.,

- Thinking in state transitions:
    - 1 - Break down the UI into component and establish the component tree
    - 2 - Build a static version in React (*Without State*)
        *State Management, 3/4 below*
    - 3 - State:
        a - When to use
        b - Types of state: local vs. global
        c - Where to place each piece of state
    - 4 - Establish data flow:
        a - One-way data flow
        b - Child to parent communication
        c - Accessing Global State.

Practice Answering these React questions!

1 - How to break up a UI design into components
2 - How to make some components reusable?
3 - How to assembly UI from reusable components
4 - What pieeces of state do I need for interactivity?
5 - Where to place state? - what component should "own" each piece of state? listItem for list, editForm (useRef), etc.
6 - What types of state can or should I use?
7 - How to make data flow through the app?

CHAT GPT: https://chat.openai.com/share/244c6673-fdcd-47c8-bbb4-62fc5e83d9fe

# Fundmaentals of state management.

- What is state management? useState() can track pieces of data over the life cycle of the application
    - 1 - Deciding WHEN to create pieces of state.
    - 2 - What TYPES of state are necessary
    - 3 - WHERE to palce each piece of state
    - 4 - HOW the data flows through the app

# Local vs. Global state.

- ALWAYS start with local state. That is, state that's only needed for the component it's housed on, and any child components.

- Global state is shared state (Context API, Redux) that is ACCESSIBLE TO EVERY COMPONENT in the entire application.

- When and where?

So, you need to store some data...

1 - Will data change at some point? 
    YES - go to 2.
    NO - Create a regular const variable.
2 - Can it be computed from existing state props?
    YES - Derive state
    NO - go to 3.
3 - Should it re-render component?
    YES - Place a new piece of state in component
    NO - Ref (useRef, more on this later) - You're done!

If #3 was YES...

4 - Is it only used by this component?
    YES - leave in component
    NO - Also used by a child component?
        YES - Pass to children via props
        NO - Used by one or more sibling components?
            YES - Lift state up to first common parent.
       
# Lifting up State

- Below, how would the total component get access to the coupon state?
- Follow the diagram you printed out to step 8, where because "state is being shared by one or a few sibling components", you have to lift it up to the nearest parent component.

                Checkout
                    |
            ----------------
            |               |   
          Total          Promotions (coupons, setCoupons)

- Because it's only "one-way data flow" in react, data cannot simply be passed as a prop, that's just not how it works.
- To "share" state with componenents that are higher up or next to the current component, we have to lift the state to the nearest parent component of all components that need the piece of state in question.
- Here, we we would remove the coupons state from Promotions and place it in the Checkout component.
- So...

                Checkout (coupons, setCoupons) - State lifted to the closest COMMON parent.
                    |
            ----------------
            |               |   
          Total          Promotions 
        {coupon} prop  {coupon, setCoupons} prop

- What if we want to add a new coupon? We want to update the coupon state, which now lives in the parent component, not the promotions component. It only receives it via props, but we cannot mutate props! 
- We simply pass it the setCoupon function as a prop :D

# Derived State

- Derived: State that is copmuted from an existing piece of state of from props

- *** ALWAYS PREFER DERIVED STATE WHEN YOU CAN ***

- *** WATCH OUT *** 
1 - THREE separate pieces of state, even though numItems and totalPrice depend on 'cart'...
2 - Need to keep them in sync (update TOGETHER)
3 - 3 state updates will cause 3 re-renders :(

const [cart, setCart] = useState([
    { name: "JavaScript Course", price: 15.99 },
    { name: "Node.js Bootcamp", price: 14.99},
])

--- WRONG ---
const [numItems, setNumItems] = useState(2)
const [totalPrice, setTotalPrice] = useState(30.98)

- *** INSTEAD *** - DERIVE state using cart.length, and cart.reduce()!

const numItems = cart.length
const totalPrice =
    cart.reduce((acc, cur) =>  acc + cur.price ,0)

# Calculating statistics as derived state

