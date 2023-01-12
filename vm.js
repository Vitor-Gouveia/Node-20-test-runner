import vm from 'node:vm'

const x = 1;

vm.createContext({
  x: 2
}); // Contextify the object.

const code = `
  function add(a, b) {
    return a + b
  }

  x = add(1, 5)
`;
// `x` and `y` are global variables in the context.
// Initially, x has the value 2 because that is the value of context.x.
vm.runInContext(code, context);

console.log(context.x); //