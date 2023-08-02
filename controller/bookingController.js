async function bookSeat(req, res) {

    try {
        const { userId, lectureId } = req.body;


        const user = await
            req.db.users.findByPk(userId);
        const lecture = await req.db.lectures.findByPk(lectureId);



        if (!user || user.role !== 'student'|| user.user_is_verified !== true ||!lecture ) {
            console.log(user,"sssd",lecture,"dswq")
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
                    attributes: ['fullname']
                },
                //     {
                //         model: req.db.lectures,
                //         attributes: []
                //     }
            ],
            attributes: ['id', 'userId','lectureId']

        });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    bookSeat,listBookings
};