
module.exports = (sequelize, Sequelize) => {

    const Ticket = sequelize.define('tickets', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        qr: {
            type: Sequelize.STRING(31),
            allowNull: false,
            field: 'QR'
        },
        status: {
            type: Sequelize.STRING(31),
            allowNull: false,
            field: 'STATUS'
        },
        mail: {
            type: Sequelize.STRING(127),
            field: 'MAIL'
        },
        mobile: {
            type: Sequelize.BIGINT,
            field: 'MOBILE'
        },
        scantime: {
            type: Sequelize.DATE,
            field: 'SCANTIME'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Ticket;
};
