// Create a Feathers application
const app = feathers();
// Initialize a REST connection
const rest = feathers.rest('http://wallet.ducatus.io:3030');
// Configure the REST client by using `window.fetch`
app.configure(rest.fetch(window.fetch));

app.service('api_key').on('created', message => {
  console.log('Created a new message locally', message);
});

async function createAndList() {
    console.log("HELLO");
  await app.service('api_key').create({
    text: 'Hello from Feathers browser client'
  });

  const messages = await app.service('messages').find();

  console.log('Messages', messages);
}

