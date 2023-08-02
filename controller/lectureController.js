const { Op } = require("sequelize");

const scheduleLecture = async (req, res) => {
    try {
        const { title, startTime, endTime, userId } = req.body;
        const user = await req.db.users.findByPk(userId);
        if (!user || user.role !== 'professor' || user.user_is_verified !== true) {
            console.log('prof bolish kk')
            res.status(403).json({"message":"Dars yaratish uchun professorni talab qilinadi yoki user tasdiqlanishi yani verify bo'lishini."});
            return;
        }
        const overlappingLectures = await req.db.lectures.findAll({
            where: {
                userId: userId,
                [Op.or]: [
                    {
                        startTime: {
                            [Op.lt]: endTime,
                        },
                        endTime: {
                            [Op.gt]: startTime,
                        },
                    },
                    {
                        startTime: {
                            [Op.gte]: startTime,
                            [Op.lt]: endTime,
                        },
                    },
                    {
                        endTime: {
                            [Op.gt]: startTime,
                            [Op.lte]: endTime,
                        },
                    },
                ],
            },
        });

        if (overlappingLectures.length > 0) {
            return res.status(400).json({ message: 'Lecture overlaps with existing lectures' });
        }
        const lecture = await req.db.lectures.create({
            title,
            startTime,
            endTime,
            userId: userId, // Assuming the field name is `professorId` in the Lecture model
        });

        res.status(201).json(lecture);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message }); // Send the error message from the caught error
    }
};


const listLecture = async (req, res) => {
    try {
        const lectures = await req.db.lectures.findAll({
            include: req.db.users,
        });
        res.json(lectures);
    } catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

const getLectureById = async (req, res) => {
    try {
        const { id } = req.params;
        const lecture = await req.db.lectures.findByPk(id, {
            include: req.db.users
        });
        if (!lecture) {
            return res.status(404).json({ error: 'Lecture topilmadi' });
        }
        res.json(lecture);
    } catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};


module.exports = {scheduleLecture,listLecture,getLectureById};