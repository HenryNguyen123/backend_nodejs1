import db from '../models/index'


const getGroupWithRole = async(user) => {
    //scope
    const roles = await db.Group.findOne({
        where: {id: user.groupId},
        include: [{
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: {attributes: []}
            }]
    })
    return roles ? roles : {}
}

module.exports = {getGroupWithRole}