import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("login", (user) => {
    console.log(`${user.name} logged in`);
});

emitter.emit("login", { id: 1, name: "Prerna" });