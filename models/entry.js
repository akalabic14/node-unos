module.exports = (sequelize, type) => {
    return sequelize.define('entry', {
        id: {
            type: type.STRING,
            primaryKey: true,
            
        },
        persons: {
            type: type.STRING

        },
        code: {
            type: type.STRING

        },
        time: {
            type: 'TIMESTAMP'

        }


    }

    )
} 