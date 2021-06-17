# robocards

## Instructions:
- fork (optional) and clone this repo
- navigate to server directory
- `npm i`
- `npm start [port]` to start server
- send queries or navigate to `localhost:4000` to load the GraphQL playground

## GraphQL API

### Types
- `Robot`
  - `id: ID` - an id
  - `seed: String` - the seed used to generate the robot's properties
  - `name: String` - name of the robot
  - `image: String` - the robohash url to the robot's image
  - `level: Int` - the level of the robot (1 - 3)
  - `health: Int` - the health of the robot
  - `attacks: [Attack]` - a list of Attack ids

- `Attack`
  - `id: ID` - an id
  - `seed: String` - the seed used to generate the attack
  - `name: String` - name of the attack
  - `level: Int` - the level of the attack (1 - 3)
  - `damage: Int` - the damage of the attack
  
### Queries
- `robots: [Robot]`
  - returns list of robots
- `attacks: [Attack]`
  - returns list of attacks
  
### Mutations
- `addRobot(seed: String)`
  - takes a seed argument, generates & adds a robot to the in-memory datastore (aka an array), and returns the generated robot
