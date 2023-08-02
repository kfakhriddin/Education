async function bookSeat(req, res) {

    try {
        const { userId, lectureId } = req.body;


        const user = await
            req.db.users.findByPk(userId);
        const lecture = await req.db.lectures.findByPk(lectureId);



        if (!user || user.role !== 'student'|| user.user_is_verified !== true ||!lecture ) {
            return res.status(404).json({ error: "band qilib bolingan yoki student bolishi va verify talab qilinadi ." });
        }
        const seat = await req.db.booking.create({
            userId: userId,
            lectureId: lectureId,
        });
        return res.status(200).json({ message: "Seat booked successfully" });
    } catch (error) {
        console.error("Error booking seat:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const listBookings = async (req, res) => {
    try {
        const bookings = await req.db.booking.findAll({
            include: [
                {
                    model: req.db.users,
                    attributes: ['id','fullname','email','role']
                },
                    {
                        model: req.db.lectures,
                        attributes: ['id','title','userId','startTime','endTime'],
                        include: [
                            {
                                model: req.db.users,
                                attributes:['id','fullname','email','role']

    }

                        ]
                    }
            ],
            attributes: ['id', 'userId','lectureId']

        });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const bookings = await req.db.booking.findByPk(id,{

            include: [
                {
                    model: req.db.users,
                    attributes: ['id','fullname','email','role']
                },
                {
                    model: req.db.lectures,
                    attributes: ['id','title','userId','startTime','endTime'],
                    include: [
                        {
                            model: req.db.users,
                            attributes:['id','fullname','email','role']

                        }

                    ]
                }
            ],
            attributes: ['id', 'userId','lectureId']

        });
        if (!bookings) {
            return res.status(404).json({ error: 'Booking topilmadi' });
        }
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};
module.exports = {
    bookSeat,listBookings,getBookingById
};