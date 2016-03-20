var loopback = require('loopback');
var ds = loopback.createDataSource('mysql', {
  "host": "localhost",
  "port": 1521,
  "database": "XE",
  "username": "demo",
  "password": "L00pBack"
});
  
// Discover and build models from INVENTORY table
ds.discoverAndBuildModels('INVENTORY', {visited: {}, associations: true},
function (err, models) {
  // Now we have a list of models keyed by the model name
  // Find the first record from the inventory
  models.Inventory.findOne({}, function (err, inv) {
    if(err) {
      console.error(err);
      return;
    }
    console.log("\nInventory: ", inv);
    // Navigate to the product model
    inv.product(function (err, prod) {
      console.log("\nProduct: ", prod);
      console.log("\n ------------- ");
    });
  });
});

// List database tables and/or views
ds.discoverModelDefinitions({views: true, limit: 20}, cb);
 
// List database columns for a given table/view
ds.discoverModelProperties('PRODUCT', cb);
ds.discoverModelProperties('INVENTORY_VIEW', {owner: 'STRONGLOOP'}, cb);
 
// List primary keys for a given table
ds.discoverPrimaryKeys('INVENTORY',  cb);
 
// List foreign keys for a given table
ds.discoverForeignKeys('INVENTORY',  cb);
 
// List foreign keys that reference the primary key of the given table
ds.discoverExportedForeignKeys('PRODUCT',  cb);
 
// Create a model definition by discovering the given table
ds.discoverSchema(table, {owner: 'STRONGLOOP'}, cb);
