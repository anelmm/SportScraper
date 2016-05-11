module.exports = function(sequelize, DataTypes) {
    var Articles = sequelize.define("Articles", {
	id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
	    autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
	subTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
	author: {
            type: DataTypes.STRING,
            allowNull: false
        },
	text: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
	creationDate: {
	    type: DataTypes.DATE,
	    allowNull: true 
	},
	isMain: {
	    type: DataTypes.BOOLEAN,
	    allowNull: false  
	}
    }, 
    {
       tableName: 'Articles'
    });

    return Articles;
}