# CHAT APP - 🇬🇧

## ABOUT THE PROJECT

### NODE.JS

Node.js is an open-source, server-side JavaScript runtime environment that executes JavaScript code outside of a web browser.
It allows developers to build scalable, high-performance applications, non-blocking I/O operations.
Node.js is commonly used for building web servers, APIs, and real-time applications, leveraging its asynchronous and event-driven architecture to handle multiple concurrent connections efficiently.
Additionally, Node.js has a vast ecosystem of libraries and frameworks, making it a popular choice for building modern, data-intensive applications.

### WHAT IS A SOCKET?

A socket is a communication endpoint that allows different processes or devices to communicate with each other over a network.
It serves as a connection interface, enabling data transmission between a client and a server in a networked environment.
Sockets are identified by unique combinations of IP addresses and port numbers, facilitating the exchange of data through various network protocols such as TCP (Transmission Control Protocol) or UDP (User Datagram Protocol).
They provide a foundation for network communication in computer systems, enabling applications to interact and share information across distributed environments.

### SOCKET.IO LIBRARY

Socket.IO is a JavaScript library for real-time, bidirectional communication between web clients and servers, simplifying the development of applications like chat systems or online gaming.

#### Explanation of Socket.IO Methods:

##### io.on("connection", callback):
Handles a new client connection, executing the provided callback function when a client connects to the server.
##### socket.emit(eventName, data):
Sends a message with the specified event name and data to the current client.
##### socket.on(eventName, callback):
Listens for a specific event from the client and executes the provided callback function when the event is received.
##### socket.join(room):
Adds the current client to the specified room, enabling communication with other clients in the same room.
##### socket.leave(room):
Removes the current client from the specified room, terminating communication with other clients in that room.
##### socket.broadcast.to(room).emit(eventName, data):
Sends a message with the specified event name and data to all clients in the specified room except the sender.
##### io.emit(eventName, data):
Sends a message with the specified event name and data to all connected clients.
##### socket.on("disconnect", callback):
Listens for the disconnection event from the client and executes the provided callback function when the client disconnects from the server.

### EXPRESS FRAMEWORK

Express is a minimalist web application framework for Node.js that provides a robust set of features for building web and mobile applications. It simplifies the process of creating server-side applications by providing a wide range of HTTP utility methods and middleware, allowing developers to define routes, handle requests, and manage responses with ease.

#### Explanation of Express Methods:

##### express():

Creates an Express application instance, which provides a framework for building web servers and defining routes.

##### app.use(middleware):

Mounts the specified middleware function or functions at the specified path or paths in the application's middleware stack. Middleware functions are executed sequentially for each request.

##### app.listen(port, [hostname], [backlog], [callback]):

Binds and listens for connections on the specified port and optional hostname. Once the server is listening, the provided callback function is executed.

## PROJECT LADDER

1. Creation of a base of the project with WebSocket
2. Implementing Socket.io library instead of WebSocket
3. Update the application with Express framework
4. Create a new look and add users and rooms

---

# CHAT APP - 🇮🇹

## PROGETTO

### NODE.JS

Node.js è un ambiente di runtime JavaScript lato server open-source che esegue codice JavaScript al di fuori di un browser web.
Consente agli sviluppatori di costruire applicazioni scalabili e ad alte prestazioni, con operazioni di I/O non bloccanti.
Node.js è comunemente utilizzato per la creazione di server web, API e applicazioni in tempo reale, sfruttando la sua architettura asincrona e basata sugli eventi per gestire efficientemente connessioni multiple contemporaneamente.
Inoltre, Node.js dispone di un vasto ecosistema di librerie e framework, rendendolo una scelta popolare per la costruzione di moderne applicazioni ad alta intensità di dati.

### COS'È UN SOCKET?
Un socket è un endpoint di comunicazione che consente a processi o dispositivi diversi di comunicare tra loro attraverso una rete.
Serve come interfaccia di connessione, consentendo la trasmissione di dati tra un client e un server in un ambiente di rete.
I socket sono identificati da combinazioni uniche di indirizzi IP e numeri di porta, facilitando lo scambio di dati attraverso vari protocolli di rete come TCP (Transmission Control Protocol) o UDP (User Datagram Protocol).
Forniscono una base per la comunicazione di rete nei sistemi informatici, consentendo alle applicazioni di interagire e condividere informazioni attraverso ambienti distribuiti.

### LIBRERIA SOCKET.IO

Socket.IO è una libreria JavaScript per la comunicazione bidirezionale e in tempo reale tra client web e server, semplificando lo sviluppo di applicazioni come sistemi di chat o giochi online.

#### Spiegazione dei Metodi di Socket.IO:

##### io.on("connection", callback):

Gestisce una nuova connessione client, eseguendo la funzione di callback fornita quando un client si connette al server.

##### socket.emit(eventName, data):

Invia un messaggio con il nome dell'evento specificato e i dati al client corrente.

##### socket.on(eventName, callback):

Ascolta un evento specifico dal client ed esegue la funzione di callback fornita quando l'evento viene ricevuto.

##### socket.join(room):

Aggiunge il client corrente alla stanza specificata, consentendo la comunicazione con altri client nella stessa stanza.

##### socket.leave(room):

Rimuove il client corrente dalla stanza specificata, terminando la comunicazione con gli altri client in quella stanza.

##### socket.broadcast.to(room).emit(eventName, data):

Invia un messaggio con il nome dell'evento specificato e i dati a tutti i client nella stanza specificata tranne il mittente.

##### io.emit(eventName, data):

Invia un messaggio con il nome dell'evento specificato e i dati a tutti i client connessi.

##### socket.on("disconnect", callback):

Ascolta l'evento di disconnessione dal client ed esegue la funzione di callback fornita quando il client si disconnette dal server.

### FRAMEWORK EXPRESS

Express è un framework minimale per applicazioni web per Node.js che fornisce un insieme robusto di funzionalità per la costruzione di applicazioni web e mobili. Semplicifica il processo di creazione di applicazioni lato server fornendo una vasta gamma di metodi di utilità HTTP e middleware, consentendo agli sviluppatori di definire percorsi, gestire richieste e gestire risposte con facilità.

#### Spiegazione dei Metodi di Express:

##### express():

Crea un'istanza dell'applicazione Express, che fornisce un framework per la creazione di server web e la definizione di percorsi.

##### app.use(middleware):

Monta la funzione middleware specificata o le funzioni nella pila di middleware dell'applicazione ai percorsi specificati. Le funzioni middleware vengono eseguite sequenzialmente per ogni richiesta.

##### app.listen(port, [hostname], [backlog], [callback]):

Associa e ascolta le connessioni sulla porta specificata e, facoltativamente, sull'hostname specificato. Una volta che il server è in ascolto, viene eseguita la funzione di callback fornita.

## FASI DEL PROGETTO

1. Creazione di una base del progetto con WebSocket
2. Implementazione della libreria Socket.io al posto di WebSocket
3. Aggiornamento dell'applicazione con il framework Express
4. Creazione di una nuova interfaccia e aggiunta di utenti e stanze

---
