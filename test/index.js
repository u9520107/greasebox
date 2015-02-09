import chai from 'chai';
import path from 'path';
import gulp from 'gulp';
import through from 'through2';
import co from 'co';

const expect = chai.expect;

import * as greasebox from '../source/index';
import cofs from '../dist/cofs';

describe('greasebox', () => {
  it('should contain all the modules', (cb) => {
    let exclusions = new Set( [].map(name => computeName(name)) );

    co(function * () {
      let modules = yield cofs.readdir(path.resolve(__dirname, '../source'));
      modules.forEach((name) => {
        if(name.match(/\.js$/) && name !== 'index.js') {
          name = computeName(name);
          if(!(exclusions.has(name) || greasebox[name])) {
            throw Error(`module ${name} is not found on greasebox.`);
          }
        }
      });
    }).then(cb)
      .catch(cb);
  });
});

function computeName(name) {
  name = name.split('.')[0].split('-');
  for (let j = 1; j < name.length; j++) {
    name[j] = name[j][0].toUpperCase() + name[j].substring(1);
  }
  return name.join('');
}
