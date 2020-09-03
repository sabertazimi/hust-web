const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');

const BundlerFactory = (startID = 0) => {
  let ID = startID;

  return (config = {}) => {
    const createAsset = (filename) => {
      try {
        const content = fs.readFileSync(filename, 'utf-8');

        const ast = babylon.parse(content, {
          sourceType: 'module',
        });

        const dependencies = [];

        traverse(ast, {
          ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
          }
        });

        const { code } = babel.transformFromAst(ast, null, {
          presets: ['env'],
        })

        return {
          id: ID++,
          filename,
          dependencies,
          code,
        };
      } catch (err) {
        console.error(err);
      }
    };

    const createGraph = (entry) => {
      const mainAsset = createAsset(entry);
      const queue = [mainAsset];

      for (const asset of queue) {
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};

        asset.dependencies.forEach((relativePath) => {
          const absolutePath = path.join(dirname, relativePath);
          const child = createAsset(absolutePath);
          asset.mapping[relativePath] = child.id;
          queue.push(child);
        });
      }

      return queue;
    };

    const bundle = (graph) => {
      let modules = '';

      graph.forEach(mod => {
        // fn + dependencies mapping
        modules += `${mod.id}: [
          function (require, module, exports) {
            ${mod.code}
          },
          ${JSON.stringify(mod.mapping)}
        ],`;
      });

      const result = `(function(modules) {
        function require(id) {
          const [fn, mapping] = modules[id];

          // construct 'require', 'module' and 'exports'
          function localRequire(relativePath) {
            // require recursion
            return require(mapping[relativePath]);
          }

          const module = { exports: {} };

          // bind code to module.exports
          fn(localRequire, module, module.exports);

          return module.exports;
        }

        require(0);
      })({${modules}})`;

      return result;
    }

    const bundler = (entry) => {
      return bundle(createGraph(entry));
    }

    return bundler;
  }
};

const factory = BundlerFactory();
const bundler = factory();
console.log(bundler('./tests/a.js'));
