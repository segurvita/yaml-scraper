const fs = require('fs');
const yaml = require('js-yaml');
const Scraper = require('../lib/yaml-scraper');

// sample yaml
const sampleFull = fs.readFileSync('./sample/sample-full.yaml', 'utf8');

// sample yaml for test to delete example
const sampleDeleteExample = fs.readFileSync('./sample/sample-delete-example.yaml', 'utf8');

// sample yaml for test to empty description
const sampleEmptyDescription = fs.readFileSync('./sample/sample-empty-description.yaml', 'utf8');

// sample yaml for test to delete parent of deprecated
const sampleDeleteDeprecatedParent = fs.readFileSync('./sample/sample-delete-deprecated-parent.yaml', 'utf8');

// unit test
describe('yaml-scraper', () => {
  describe('Format is string', () => {
    test('Delete example', () => {
      const strOutput = Scraper(sampleFull).delete('example').toString();
      expect(strOutput).toBe(sampleDeleteExample);
    });
    test('Empty description', () => {
      const strOutput = Scraper(sampleFull).empty('description').toString();
      expect(strOutput).toBe(sampleEmptyDescription);
    });
    test('Delete parent of deprecated', () => {
      const strOutput = Scraper(sampleFull).deleteParent('deprecated').toString();
      expect(strOutput).toBe(sampleDeleteDeprecatedParent);
    });
  });
  describe('Format is object', () => {
    test('Delete example', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).delete('example').toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteExample);
    });
    test('Empty description', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).empty('description').toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleEmptyDescription);
    });
    test('Delete parent of deprecated', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).deleteParent('deprecated').toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteDeprecatedParent);
    });
  });
  describe('Exception test', () => {
    test('Falsy', () => {
      try {
        Scraper('').delete('example').toString();
      } catch (error) {
        expect(error.message).toBe('input is falsy.');
      }
    });
    test('Falsy', () => {
      try {
        Scraper('hoge').delete('example').toString();
      } catch (error) {
        expect(error.message).toBe('Loading yaml is failed.');
      }
    });
  });
});
