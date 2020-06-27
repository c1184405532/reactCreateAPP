const { override, fixBabelImports,addWebpackAlias  } = require('customize-cra');
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    (config)=>{ //暴露webpack的配置 config ,evn
        // 去掉打包生产map 文件
        // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
        // if(process.env.NODE_ENV==="production") config.devtool=false;
        // if(process.env.NODE_ENV!=="development") config.plugins = [...config.plugins,...myPlugin]
        //1.修改、添加loader 配置 :
        // 所有的loaders规则是在config.module.rules(数组)的第二项
        // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
        // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
        // const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
        // loaders[5].use.push({
        //     loader: 'sass-resources-loader',
        //     options: {
        //         resources: path.resolve(__dirname, 'src/asset/base.scss')//全局引入公共的scss 文件
        //     }
        // })
        const webpackModule = config.module;
        webpackModule.rules.push({
            test: cssRegex,
            exclude: cssModuleRegex,
            use:[
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-import'),
                                require('postcss-url'),
                               
                                require('postcss-aspect-ratio-mini'),
                                require('postcss-write-svg')({utf8: false}),
                                require('postcss-cssnext'),
                                require('postcss-px-to-viewport')({
                                    
                                    viewportWidth: 750,     // (Number) The width of the viewport.
                                    viewportHeight: 1334,    // (Number) The height of the viewport.
                                    unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
                                    viewportUnit: 'vw',     // (String) Expected units.
                                    selectorBlackList: ['.ignore', '.hairlines','.am'],  // (Array) The selectors to ignore and leave as px.
                                    minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
                                    mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
                                }),
                                //require('postcss-viewport-units')({silence:true}), 用于兼容部分手机不支持vw 需要就安装 当前项目已卸载
                                // require('cssnano')({
                                //     reduceIdents: { keyframes: false },
                                //     preset: "advanced",
                                //     autoprefixer: false,
                                //     "postcss-zindex": false,
                                    
                                // }),
                               
                            ],
                        },

                    }
            ],
            sideEffects: true,
        })
         //console.log('webpackModule',webpackModule)
        return config
    },
);