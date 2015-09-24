require("babel/register")({
    stage: 1,
    ignore:[ 'uuid.js', 'rx.js', 'lodash', 'moment','ges-client', 'nested-error']
});
