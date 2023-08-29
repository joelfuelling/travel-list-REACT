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