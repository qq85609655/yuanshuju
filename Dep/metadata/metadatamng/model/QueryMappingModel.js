/**
 * 元数据属性model
 */
Ext.define('Dep.metadata.metadatamng.model.QueryMappingModel', {
    extend : 'Ext.data.Model',
    fields : [
        {name:"sourceCode",type:"string"},
        {name:"targetCode",type:"string"},
        {name:"sourceName",type:"string"},
        {name:"targetName",type:"string"},
        {name:"mappTypeName",type:"string"},
        {name:"mappId",type:"string"}
    ],
});