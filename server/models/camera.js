module.exports = function(Camera) {
  // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  // Camera.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
  
  // Remote methods
  Camera.putFlags = function(flags, cb) {
    cb(null, flags);
  };

  Camera.remoteMethod('putFlags', {
    accepts: { arg: 'flags', type: 'object' },
    returns: { arg: 'flags', type: 'object' },
     http: {path:'/flags', verb: 'put'}
  });

  // Remote hooks
  Camera.beforeRemote('putFlags', function(ctx, camera, next) {
    console.log('cam = ', camera);
    next();
  });

  Camera.afterRemote('putFlags', function(ctx, out, next) {
    console.log('out = ', out);
    next();
  });

  // Operational hooks:
  Camera.observe('before save', function filterProperties(ctx, next) {
    // if (ctx.options && ctx.options.skipPropertyFilter) return next();
    // if (ctx.instance) {
    //   FILTERED_PROPERTIES.forEach(function(p) { ctx.instance.unsetAttribute(p); });
    // } else {
    //   FILTERED_PROPERTIES.forEach(function(p) { delete ctx.data[p]; });
    // }
    next();
  });
};
