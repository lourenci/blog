---
title: What is the difference between a Component and a PureComponent?
date: "2019-08-05T20:50:00.000Z"
updates: ["2020-03-05T22:20:00.000Z"]
tags: ["react"]
---

In the class components land, you can define a component either by extending it from `React.Component` or from `React.PureComponent`.

Whatever component you use, when it changes its state or it receives a new prop from its parent, React will call the `render` lifecycle method of the component and of the all children of the component, the famous VDOM (kind of DOM in memory) will be generated and React will compare the generated VDOM to the previous generated VDOM (render phase), if any changes are detected React will apply them to the real DOM (commit phase). It's much cheaper and faster to deal with the VDOM than to the real DOM, that's the magic behind the "modern" front-end libs to be very fast.

Even React doing a lot of work under the hood to keep this process fast, the `render` method is the most expensive "routine" in it. We should avoid it whenever it's possible.

## `shouldComponentUpdate` lifecycle method

Just before to call the `render` method, React will call the `shouldComponentUpdate` lifecycle method passing the `prevProps` and the `prevState` as parameters. You can use this hook to prevent your component to be rendered. If you return `false` on it, React will not perform the render, thus it will not call the `render` lifecycle method. The `<Counter />` below will never be shown updated:

```jsx
class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 0 }
  }

  shouldComponentUpdate (_prevProps, _prevState) {
    // This will make the render to never be called.
    return false
  }

  render () {
    return (
      <div>
        <span>{this.state.value}</span>
        <button
          type='button'
          onClick={() => this.setState(({ value }) => ({ value: value + 1 }))}
        >
          Increment
        </button>
      </div>
    )
  }
}
```

## Where does the `PureComponent` differ from the `Component`?

When a component receives a new value for the prop or for the state, React will call the `render` method even when the change is to the same value.

With that in mind, [the `PureComponent` has an implementation of the `shouldComponentUpdate` hook that performs a shallow comparison between the `prevProps` with the new `props` and the `prevState` with the new `state`](https://github.com/facebook/react/blob/0c1ec049f8832d1c27f876844666fda393036800/packages/react-reconciler/src/ReactFiberClassComponent.js#L297-L301). When the change is to the same values, the React `shouldComponentUpdate` implementation will return `false` preventing the `render` method to be called.

To demonstrate that, I made the component below that keeps a state for a value and it renders two components to show this value: one through the `PureComponent` and another with the `Component`. When the button is clicked, the state is changed to the same value. Every time the `render` is called on these components, a log appears in the console to show their updates. Click on the button and look at the console.

<iframe src="https://codesandbox.io/embed/tender-gauss-020um?expanddevtools=1&fontsize=14&hidenavigation=1&moduleview=1&view=preview" title="component-x-purecomponent" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

A shallow comparison is about to not be deep in some array or object comparison. If an object has others objects inside it, this inner objects will not be compared. Furthermore, objects (including arrays and functions) are compared by their references and primitives values by their values. [You can see the `shallow` code on React's github](https://github.com/facebook/react/blob/42794557ca44a8c05c71aab698d44d1294236538/packages/shared/shallowEqual.js).

The use of the `PureComponent` is a good strategy to get a better performance on your project.

## Leveraging the `PureComponent`

### Don't mutate

You shouldn't mutate any parent's object that you pass through a prop to its `pure` children, once they will perform a shallow comparison before to call the `render`, your UI children won't get updated.

### Try to bind functions in constructor whenever it's possible

Every time the `render` of the parent of this `PureComponent`
```jsx
<PureCounter
  fn={this.callback.bind(this, 'arg')}
  value={1}
/>
```
is called, a new function will be created and the `shouldComponentUpdate` will fail. This happens with arrow functions too.

In order to avoid that, you could pass the handle as one prop and its argument as another prop. Something like that:
```jsx
// this.callback is binded in constructor.
<PureCounter
  fn={this.callback}
  fnArg='arg'
  value={1}
/>

// PureCounter/index.js
onClick () {
  this.props.fn(this.props.fnArg)
}
```

## What about the functional components?

Now after one year that Hooks are around, you have been asking yourself: what is the functional component way for `PureComponent`?

### `React.memo`

`React.memo` is a high order component that receives a component and returns you another component. This new component will be able to do a shallow comparison on its props then the rerender will not take place if nothing has changed.

```jsx
const MyCleverComponent = React.memo(function MyComponent(props) {})
```

Note that `React.memo` doesn't prevent a rerender from a state change, whereas the `PureComponent` does, but you can also use "memo" on its children too.
