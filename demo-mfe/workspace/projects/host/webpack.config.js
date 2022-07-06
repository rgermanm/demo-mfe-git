const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "host",
    publicPath: "auto",
    scriptType: 'text/javascript',

  },

  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
 
  plugins: [
    new ModuleFederationPlugin({

      // For remotes (please adjust)
      // name: "host",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './projects/host/src/app/app.component.ts',
      // },        

      // For hosts (please adjust)
      remotes: {
        "mf1": "mf1@http://localhost:4242/showInfo.js",
        "mf2": "mf1@http://localhost:4443/navEntry.js",
        "mfext": "mfext@http://localhost:4442/externalEntry.js",
        "mfApp": "mfApp@http://localhost:4443/wrapEntry.js",
      },

      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        rxjs: {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true,
        },
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};
