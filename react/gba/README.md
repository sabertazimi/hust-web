# gba

[![Author](https://img.shields.io/badge/author-sabertaz-lightgrey?style=for-the-badge)](https://github.com/sabertazimi)
[![LICENSE](https://img.shields.io/github/license/sabertazimi/gba?style=for-the-badge)](https://raw.githubusercontent.com/sabertazimi/gba/main/LICENSE)

[![Code Lines](https://img.shields.io/tokei/lines/github/sabertazimi/gba?style=for-the-badge&logo=visualstudiocode)](https://github.com/sabertazimi/gba)
[![CI](https://img.shields.io/github/workflow/status/sabertazimi/gba/CI/main?style=for-the-badge&logo=github)](https://github.com/sabertazimi/gba/actions/workflows/ci.yml)

A simple [GoBang AI](https://sabertazimi.github.io/hust-web/react/gba)

## Installation

```bash
sudo apt install node
```

```bash
npm install
npm start
```

## Monte Carlo tree search (MCTS)

### Benifits over Minimax Algorithm

- To determine which moves are good, depth-limited minimax needs a function
  that gives the estimated strength of any given game state. This heuristic
  function may be difficult to obtain, for example in the case of Go. MCTS does
  not need such a heuristic function, making it **aheuristic**
- MCTS efficiently deals with games with a high branching factor. As it gains
  information, MCTS increasingly favors moves that are more likely to be good,
  making its search **asymmetric**
- Minimax needs to run to completion to give the best move, which makes its
  runtime (and run-space) non-flexible. For games with large state spaces like
  chess and Go, this exhaustive search may even be intractable. MCTS does not
  need to run to completion; it outputs stronger plays the longer it runs, but
  its search can be stopped at any point. Having this flexible property, we say
  that MCTS is **anytime**

While minimax is an elegant algorithm for solving simple games, MCTS is a
more powerful alternative for more complex games — even as it gives us
approximate solutions instead of absolute ones. Being aheuristic, asymmetric,
and anytime makes MCTS an attractive option for complex general game-playing

### Key Steps

- selection: Selection function applied recursively until a leaf node is reached
- expansion: one or more nodes might be created
- simulation: one simulated game is played
- backpropagation: result of this simulated game is backpropagated in the tree

### Selection

- explore new paths to gain information
- use existing information to exploit paths known to be good
- select child nodes using a selection function that balances exploration and exploitation

MCTS + UCB1 (Upper Confidence Bound 1)
= UCT (Upper Confidence Bound 1 applied to trees)

UCT selection function =
`(wᵢ / sᵢ) + (c * sqrt(ln sₚ / sᵢ))`
(exploitation term + exploration term) (c = sqrt(2))

Starting from the root node of the search tree, we go down the tree by
repeatedly (1) selecting a legal move and (2) advancing to the corresponding
child node. If one, several, or all of the legal moves in a node does not
have a corresponding node in the search tree, we stop selection.

### Expansion

add a new node as a child to the last selected node in the selection phase,
expanding the search tree. The statistics information in the node is
initialized with 0 wins out of 0 simulations (wᵢ = 0, sᵢ = 0)

After selection stops, there will be at least one unexpanded move in the
search tree. Now, we randomly choose one of them and we then create the child
node corresponding to that move (bolded in the diagram). We add this node as
a child to the last selected node in the selection phase, expanding the
search tree. The statistics information in the node is initialized with 0
wins out of 0 simulations.

### Simulation

Continuing from the newly-created node in the expansion phase, moves are
selected randomly and the game state is repeatedly advanced. This repeats
until the game is finished and a winner emerges. No new nodes are created in
this phase.

### Backpropagation

- Each visited node has its simulation count sᵢ incremented
- Depending on which player wins, its win count wᵢ may also be incremented

If black wins, so each visited white node’s win count is incremented. This
flip is due to the fact that each node’s statistics are used for its parent
node’s choice, not its own

The UCB1 function, in turn, uses the numbers of wins wᵢ and simulations sᵢ of
the children nodes, and the number of simulations of the parent node sₚ

After the simulation phase, the statistics on all the visited nodes (bolded
in the diagram) are updated. Each visited node has its simulation count
incremented. Depending on which player wins, its win count may also be
incremented. In the diagram, black wins, so each visited white node’s win
count is incremented. This flip is due to the fact that each node’s
statistics are used for its parent node’s choice, not its own.

## Contact

[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sabertazimi@gmail.com)
[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sabertazimi)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sabertazimi)
