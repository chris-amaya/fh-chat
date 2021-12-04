import AppServer from "./classes/AppServer";
const server = new AppServer(8000);

console.log("asdfasf");

server.start(() => {
  console.log(`Server Running on ${server.port}`);
});
