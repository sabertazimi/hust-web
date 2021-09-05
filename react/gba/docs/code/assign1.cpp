#include <iostream>
#include <utility>
#include <queue>
#include <stack>

const int DIM = 5;

class Algo {
  int maze[DIM][DIM];
  std::pair<int, int> parent[DIM][DIM];
  bool visit[DIM][DIM];
  int dim;

public:
  Algo(const int dim, int maze[DIM][DIM]) {
    this->dim = dim;

    for (int i = 0; i < dim; ++i) {
      for (int j = 0; j < dim; ++j) {
        this->maze[i][j] = maze[i][j];
	this->parent[i][j] = std::make_pair(-1, -1);
        this->visit[i][j] = false;
      }
    }
  }

  bool run() {
    int directions[4][2] = {
      -1, 0,
      1, 0,
      0, -1,
      0, 1,
    };
    std::queue<std::pair<int, int> > frontier;

    frontier.push(std::make_pair(0, 0));
    this->parent[0][0] = std::make_pair(0, 0);
    this->visit[0][0] = true;

    while (!frontier.empty()) {
      std::pair<int, int> cur = frontier.front();
      frontier.pop();

      for (int i = 0; i < 4; ++i) {
        int rowdir = directions[i][0];
        int coldir = directions[i][1];
        int row = cur.first + rowdir;
        int col = cur.second + coldir;

        if (row + 1 == this->dim && col + 1 == this->dim) {
    	  this->parent[row][col] = std::make_pair(cur.first, cur.second);
          return true;
        }

        bool isInMaze = (row >= 0 && row < this->dim
          && col >= 0 && col < this->dim);

        if (isInMaze && this->maze[row][col] == 0 && !this->visit[row][col]) {
          frontier.push(std::make_pair(row, col));
    	  this->parent[row][col] = std::make_pair(cur.first, cur.second);
          this->visit[row][col] = true;
        }
      }
    }

    return false;
  }

  void printPath(void) {
    std::stack<std::pair<int, int> > path;
    std::pair<int, int> trav = this->parent[DIM - 1][DIM - 1];
    path.push(std::make_pair(DIM - 1, DIM - 1));

    while (trav.first != -1) {
      path.push(trav);

      if (trav.first == 0 && trav.second == 0) {
        break;
      }

      trav = this->parent[trav.first][trav.second];
    }

    std::cout << "START -> ";

    while(!path.empty()) {
      trav = path.top();
      path.pop();
      std::cout << "(" << trav.first << ", " << trav.second << ") -> ";
    }

    std::cout << "END" << std::endl;
  }
};

int main(void) {
  int maze[DIM][DIM] = {
    0, 1, 0, 0, 0,
    0, 0, 0, 1, 0,
    0, 1, 1, 1, 0,
    0, 1, 1, 1, 0,
    0, 0, 0, 1, 0,
  };

  Algo algo(DIM, maze);
  bool result = algo.run();
  std::cout << "Maze resolved: "
            << (result ? "true" : "false")
            << std::endl;

  if (result) {
    algo.printPath();
  }

  return 0;
}
