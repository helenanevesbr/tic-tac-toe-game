export default function aiPlay(history, state, setState) {
    /*setState is a method provided by the React library, so why would I neeed to pass it down as argument?
    Because I need to bind it to the correct context in order to update the state of the parent component
    I'm passing a reference to the setState() method of the parent Game component, along with the correct context (this) to call it with.
    This allows aiPlay() to call setState() and update the state of the parent Game component.
    */
   
    console.log('history', history)
    console.log('state',state)
    console.log('setState',setState)
}