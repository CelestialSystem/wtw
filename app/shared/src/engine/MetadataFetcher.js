Ext.define('WTW.util.MetadataFetcher', {
  singleton: true,
  alternateClassName: 'MetadataFetcher',

  /**
   * This function loads the view by first fetching the metadata and then parsing it
   * It calls the provided callBackfn with the parsed datas
   * @param {String} viewName 
   * @param {Function} callBackfn 
   */
  loadView: function (viewName, callBackfn) {
      var path = 'files/getfile',
          jsonData = { "fileName": `${viewName}.json` },
          method = path === 'files/getfile' ? 'POST' : 'GET',
          me = this,
          content,
          parsedData,
          hashValue,
          metaData;

      me.loadFromCache(viewName, function (isCached, cachedData) {
        if (isCached) {
          console.log('No hash changes, loading from cache');
          callBackfn(FormEngine.parseLayout(cachedData.content));
          UTIL.mask(1);
        } else {
            UTIL.mask();
            DATA[method.toLowerCase()](URLS.url.api + path, jsonData, handleResponse, handleError, me);
        }
      });

      function handleResponse(metadata) {
        content = metadata.value || metadata;
        parsedData = Ext.decode(content);
        hashValue =  INDEXED_DB.hash(content);
        // hashValue = me.hash(parsedData);

        // Fetch the existing metadata from cache
        INDEXED_DB.getItem('metaDataValues', function (cachedContent) {
          metaData = cachedContent ? JSON.parse(cachedContent) : {};

          // Update the cache with new content and hash
          metaData[viewName] = {
            hash: hashValue,
            content: parsedData
          };

          // Save updated metadata to cache
          INDEXED_DB.setItem('metaDataValues', JSON.stringify(metaData), function () {
            console.log('metaDataValues successfully saved.');
            // Call the callback function to render the data
            // callBackfn(FormEngine.parseLayout(parsedData));
            UTIL.mask(1); // Hide load mask
          }, function() {
            console.error('Failed to save metaDataValues:', error);
            UTIL.mask(1); // Ensure load mask is hidden even on error
          });
          
          });
          callBackfn(FormEngine.parseLayout(parsedData));
      }

      function handleError(error) {
          console.error("Failed to load metadata:", error);
          UTIL.mask(1); 
      }
  },

  // Function to check if the data is valid in the cache
  loadFromCache: function (viewName, callback) {
    INDEXED_DB.getItem('metaDataValues', function (contents) {
          if (contents) {
              var parsedContents = JSON.parse(contents);
              var cachedData = parsedContents[viewName];
              var dummyJson = localStorage.getItem('hashData');
              var dummyHash = dummyJson ? JSON.parse(dummyJson)[viewName] : null;

              if (cachedData && dummyHash === cachedData.hash) {
                  callback(true, cachedData);
                  return;
              }
          }
          callback(false, null);
      }, function(){
        INDEXED_DB.setItem('metaDataValues', '');
        callback(false, null);
        
      });
  }
});
