// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

/**
 * From fetching CSV data:
 * https://gridsome.org/docs/fetching-data/#csv
 */
const {readFileSync} = require('fs');
const parse = require('csv-parse/sync').parse;

const DataDirectory = './src/data/dist/';

const BuildingEmissionsDataFile = 'building-benchmarks.csv';

// This is an array equivalent of Object.keys(BuildingOwners) but this file can't use Typescript and
// import that file
const BuildingOwnerIds = [
  'depaul',
  'uchicago',
  'uic',
  'iit',
  'northwestern',
  'loyola',
  'cps',
  'cha',
  'cityofchicago'
];

module.exports = function(api) {
  // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  api.loadSource(async (actions) => {
    loadBuildingBenchmarkData(actions);
  });

  // Use the Pages API here: https://gridsome.org/docs/pages-api/
  api.createPages(({ createPage }) => {
    // Create pages for building owners. This could be a dynamic route, but making it this way
    // should let them get statically built as expected
    BuildingOwnerIds.forEach(ownerId => {
      createPage({
        path: `/owner/${ownerId}`,
        component: './src/templates/BuildingOwner.vue',
        context: { ownerId },
      })
    })
  });
};

/**
 * Load in the building benchmark data
 *
 * @param {unknown} actions The actions class?
 */
function loadBuildingBenchmarkData(actions) {
  const input = readFileSync(`${DataDirectory}${BuildingEmissionsDataFile}`, 'utf8');

  /**
   * Load in building benchmarks and expose as Buildings collection
   */
  const BuildingsData = parse(input, {
    columns: true,
    skip_empty_lines: true,
  });

  const collection = actions.addCollection({typeName: 'Building'});

  for (const building of BuildingsData) {
    // Make a slugSource that is the property name or the address as a fallback (skip one letter
    // names, e.g. '-)
    building.slugSource = building.PropertyName.length > 1 ? building.PropertyName : building.Address;

    if (!building.slugSource || typeof building.slugSource !== 'string') {
      throw new Error('No building slug source (name or address)!', building);
    }

    collection.addNode(building);
  }
}
